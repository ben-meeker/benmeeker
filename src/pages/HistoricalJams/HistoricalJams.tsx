import React, { useState } from 'react';
import { MonthlyPlaylist } from '../../components/MonthlyPlaylist';
import { SpotifyAuthNotification } from '../../components/SpotifyAuthNotification';
import { MobilePlaybackInfo } from '../../components/MobilePlaybackInfo';
import { useSpotify } from '../../hooks/useSpotify';
import { historicalJams } from '../../data/historicalJams';
import './HistoricalJams.css';

export const HistoricalJams: React.FC = () => {
  const { isAuthenticated } = useSpotify();
  const [searchQuery, setSearchQuery] = useState('');
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Sort playlists from newest to oldest
  const sortedPlaylists = [...historicalJams].reverse();

  // Filter playlists based on search query
  const filteredPlaylists = sortedPlaylists.map((playlist) => {
    if (!searchQuery.trim()) {
      return playlist;
    }

    const query = searchQuery.toLowerCase();
    
    // Check if the search matches the month/year
    const monthYearMatch = 
      playlist.month.toLowerCase().includes(query) ||
      playlist.year.toString().includes(query) ||
      `${playlist.month.toLowerCase()} ${playlist.year}`.includes(query);

    // If month/year matches, return the entire playlist
    if (monthYearMatch) {
      return playlist;
    }

    // Otherwise, filter songs
    const filteredSongs = playlist.songs.filter((song) => {
      const matchesName = song.name.toLowerCase().includes(query);
      const matchesArtist = song.artist.toLowerCase().includes(query);
      const matchesAlbum = song.album?.toLowerCase().includes(query);
      return matchesName || matchesArtist || matchesAlbum;
    });

    return {
      ...playlist,
      songs: filteredSongs,
    };
  }).filter((playlist) => playlist.songs.length > 0);

  return (
    <div className="historical-jams">
      <SpotifyAuthNotification />
      {isMobile && isAuthenticated && <MobilePlaybackInfo />}
      
      <section className="historical-jams__hero">
        <div className="container">
          <h1 className="historical-jams__title">Historical Jams</h1>
          <p className="historical-jams__subtitle">
            Songs I have listened to through the ages!
          </p>
          
          <div className="historical-jams__search">
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="historical-jams__search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="historical-jams__search-clear"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="historical-jams__content">
        <div className="container">
          {filteredPlaylists.length > 0 ? (
            <div className="historical-jams__playlists">
              {filteredPlaylists.map((playlist) => (
                <MonthlyPlaylist 
                  key={`${playlist.month}-${playlist.year}`} 
                  playlist={playlist}
                />
              ))}
            </div>
          ) : (
            <div className="historical-jams__no-results">
              <p>No songs found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

