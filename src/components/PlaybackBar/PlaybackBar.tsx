import React, { useState, useEffect, useRef } from 'react';
import { useSpotify } from '../../contexts/SpotifyContext';
import { webPlaybackPlayer } from '../../services/webPlaybackPlayer';
import './PlaybackBar.css';

export const PlaybackBar: React.FC = () => {
  const {
    currentPlaylist,
    currentTrackIndex,
    isPlaying,
    pausePlayback,
    nextTrack,
    previousTrack,
    shuffle,
    toggleShuffle,
    seekToPosition,
    resumePlayback,
  } = useSpotify();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const progressIntervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const currentSong = currentPlaylist && currentTrackIndex !== null
    ? currentPlaylist.songs[currentTrackIndex]
    : null;

  // Get duration when song changes
  useEffect(() => {
    const getDuration = async () => {
      if (currentSong) {
        try {
          const state = await webPlaybackPlayer.getCurrentState();
          if (state?.track_window?.current_track?.duration_ms) {
            setDuration(state.track_window.current_track.duration_ms);
            // Get initial position
            setProgress(state.position || 0);
            startTimeRef.current = Date.now() - (state.position || 0);
          }
        } catch (error) {
          console.error('Error getting duration:', error);
        }
      } else {
        setDuration(0);
        setProgress(0);
      }
    };

    getDuration();
  }, [currentSong]);

  // Local timer that counts up while playing
  useEffect(() => {
    if (isPlaying && !isDragging && duration > 0) {
      // Update progress every 100ms for smooth animation
      progressIntervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        
        if (elapsed >= duration) {
          // Song ended
          setProgress(duration);
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          // Trigger next track
          setTimeout(() => {
            nextTrack();
          }, 100);
        } else {
          setProgress(elapsed);
        }
      }, 100);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, isDragging, duration, nextTrack]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await pausePlayback();
    } else {
      // Resume playback
      await resumePlayback();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value, 10);
    setProgress(newProgress);
  };

  const handleProgressMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressMouseUp = async (e: React.MouseEvent<HTMLInputElement>) => {
    setIsDragging(false);
    const newProgress = parseInt((e.target as HTMLInputElement).value, 10);
    await seekToPosition(newProgress);
    // Reset the timer to the new position
    startTimeRef.current = Date.now() - newProgress;
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentSong) {
    return null;
  }

  return (
    <div className="playback-bar">
      <div className="playback-bar__container">
        {/* Song Info */}
        <div className="playback-bar__song-info">
          <div className="playback-bar__song-details">
            <div className="playback-bar__song-name">{currentSong.name}</div>
            <div className="playback-bar__song-artist">{currentSong.artist}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="playback-bar__controls">
          <div className="playback-bar__buttons">
            <button
              className={`playback-bar__button ${shuffle ? 'playback-bar__button--active' : ''}`}
              onClick={toggleShuffle}
              title={shuffle ? 'Shuffle on' : 'Shuffle off'}
              aria-label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
              </svg>
            </button>
            
            <button
              className="playback-bar__button"
              onClick={previousTrack}
              title="Previous"
              aria-label="Previous track"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>

            <button
              className="playback-bar__button playback-bar__button--play"
              onClick={handlePlayPause}
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button
              className="playback-bar__button"
              onClick={nextTrack}
              title="Next"
              aria-label="Next track"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="playback-bar__progress-container">
            <span className="playback-bar__time">{formatTime(progress)}</span>
            <div className="playback-bar__progress-wrapper">
              <div 
                className="playback-bar__progress-fill"
                style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={progress}
                onChange={handleProgressChange}
                onMouseDown={handleProgressMouseDown}
                onMouseUp={handleProgressMouseUp}
                className="playback-bar__progress"
                aria-label="Seek position"
              />
            </div>
            <span className="playback-bar__time">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playlist Info */}
        <div className="playback-bar__playlist-info">
          {currentPlaylist && (
            <div className="playback-bar__playlist-name">
              {currentPlaylist.month} {currentPlaylist.year}
              <span className="playback-bar__track-count">
                {currentTrackIndex! + 1} / {currentPlaylist.songs.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

