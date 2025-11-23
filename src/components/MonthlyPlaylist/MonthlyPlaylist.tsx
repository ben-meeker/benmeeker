import React, { useState } from 'react';
import type { MonthlyPlaylist as MonthlyPlaylistType } from '../../data/historicalJams';
import { SongItem } from '../SongItem';
import { useSpotify } from '../../contexts/SpotifyContext';
import './MonthlyPlaylist.css';

interface MonthlyPlaylistProps {
  playlist: MonthlyPlaylistType;
  isExpanded?: boolean;
}

export const MonthlyPlaylist: React.FC<MonthlyPlaylistProps> = ({ 
  playlist, 
  isExpanded: defaultExpanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { setCurrentPlaylist } = useSpotify();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Set the current playlist when a song is played
  const handleSongPlay = () => {
    setCurrentPlaylist(playlist);
  };

  return (
    <div className={`monthly-playlist ${isExpanded ? 'monthly-playlist--expanded' : ''}`}>
      <div className="monthly-playlist__header" onClick={toggleExpanded}>
        <div className="monthly-playlist__title-section">
          <h2 className="monthly-playlist__title">
            {playlist.month} {playlist.year}
          </h2>
          <div className="monthly-playlist__count">
            {playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}
          </div>
        </div>
        
        <button 
          className="monthly-playlist__toggle"
          aria-label={isExpanded ? 'Collapse playlist' : 'Expand playlist'}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="monthly-playlist__toggle-icon"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="monthly-playlist__content">
          <div className="monthly-playlist__songs">
            {playlist.songs.map((song, index) => (
              <div key={`${song.name}-${song.artist}-${index}`} onClick={handleSongPlay}>
                <SongItem 
                  song={song} 
                  index={index}
                  playlist={playlist}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

