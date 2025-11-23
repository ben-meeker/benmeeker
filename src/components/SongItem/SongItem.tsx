import React, { useState } from 'react';
import { useSpotify } from '../../contexts/SpotifyContext';
import { spotifyService } from '../../services/spotify';
import type { Song, MonthlyPlaylist } from '../../data/historicalJams';
import './SongItem.css';

interface SongItemProps {
  song: Song;
  index: number;
  playlist: MonthlyPlaylist;
}

export const SongItem: React.FC<SongItemProps> = ({ song, index, playlist }) => {
  const { isAuthenticated, playTrack, pausePlayback, currentTrack, setCurrentPlaylist, isPlaying } = useSpotify();
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [trackUri, setTrackUri] = useState<string | null>(song.spotifyUri || null);

  const isCurrentlyPlaying = currentTrack === trackUri && trackUri !== null && isPlaying;

  const handlePlayPause = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      setError(null);

      // If this song is currently playing, pause it
      if (isCurrentlyPlaying) {
        await pausePlayback();
        return;
      }

      // Set the current playlist
      setCurrentPlaylist(playlist);

      // Otherwise, play the song
      setIsSearching(true);

      let uri = trackUri;

      // If we don't have a URI yet, search for the track
      if (!uri) {
        const track = await spotifyService.searchTrack(song.name, song.artist);
        if (track && track.uri) {
          uri = track.uri;
          setTrackUri(uri);
        } else {
          throw new Error('Track not found on Spotify');
        }
      }

      if (uri) {
        await playTrack(uri, index);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to play track');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className={`song-item ${isCurrentlyPlaying ? 'song-item--playing' : ''}`}>
      <div className="song-item__index">{index + 1}</div>
      
      <div className="song-item__info">
        <div className="song-item__name">{song.name}</div>
        <div className="song-item__artist">{song.artist}</div>
        {song.album && <div className="song-item__album">{song.album}</div>}
      </div>

      {isAuthenticated ? (
        <button
          className="song-item__play-button"
          onClick={handlePlayPause}
          disabled={isSearching}
          aria-label={isCurrentlyPlaying ? `Pause ${song.name}` : `Play ${song.name} by ${song.artist}`}
          title={isCurrentlyPlaying ? `Pause ${song.name}` : `Play ${song.name}`}
        >
          {isSearching ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="spinner">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
              <path d="M8 2 A6 6 0 0 1 14 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="1s" repeatCount="indefinite"/>
              </path>
            </svg>
          ) : isCurrentlyPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 2h3v12H3V2zm7 0h3v12h-3V2z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 2l10 6-10 6V2z" />
            </svg>
          )}
        </button>
      ) : (
        <div className="song-item__spotify-icon" title="Login to play">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.771a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.687zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
          </svg>
        </div>
      )}

      {error && <div className="song-item__error">{error}</div>}
    </div>
  );
};

