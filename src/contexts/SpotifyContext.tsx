import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { spotifyService } from '../services/spotify';
import { webPlaybackPlayer } from '../services/webPlaybackPlayer';

interface Song {
  name: string;
  artist: string;
  album?: string;
  uri?: string;
}

interface Playlist {
  month: string;
  year: number;
  songs: Song[];
}

interface SpotifyContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  playTrack: (trackUri: string, trackIndex?: number) => Promise<void>;
  pausePlayback: () => Promise<void>;
  resumePlayback: () => Promise<void>;
  currentTrack: string | null;
  setCurrentTrack: (trackUri: string | null) => void;
  isPlayerReady: boolean;
  currentPlaylist: Playlist | null;
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  currentTrackIndex: number | null;
  isPlaying: boolean;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  shuffle: boolean;
  toggleShuffle: () => void;
  seekToPosition: (positionMs: number) => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

interface SpotifyProviderProps {
  children: ReactNode;
}

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playOrder, setPlayOrder] = useState<number[]>([]);

  useEffect(() => {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check if there's a callback in the URL and handle it
    const handleAuth = async () => {
      const hasCallback = await spotifyService.handleCallback();
      const isAuth = spotifyService.isAuthenticated();
      
      setIsAuthenticated(isAuth);

      // Only initialize Web Playback SDK on desktop
      if ((hasCallback || isAuth) && !isMobile) {
        // Initialize Web Playback SDK player
        const token = spotifyService.getAccessToken();
        if (token) {
          try {
            const id = await webPlaybackPlayer.initialize(token);
            if (id) {
              setDeviceId(id);
              setIsPlayerReady(true);

              // Listen to player state changes
              const player = webPlaybackPlayer.getPlayer();
              if (player) {
                player.addListener('player_state_changed', (state: Spotify.PlaybackState | null) => {
                  if (state) {
                    setIsPlaying(!state.paused);
                  }
                });
              }
            }
          } catch (error) {
            console.error('Failed to initialize player:', error);
          }
        }
      } else if (isAuth && isMobile) {
        // On mobile, mark as ready without Web Playback SDK
        // User will control playback through their Spotify app
        setIsPlayerReady(true);
      }
    };
    
    handleAuth();

    // Cleanup on unmount
    return () => {
      webPlaybackPlayer.disconnect();
    };
  }, []);

  const login = async () => {
    try {
      const authUrl = await spotifyService.getAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error initiating Spotify login:', error);
    }
  };

  const logout = () => {
    spotifyService.logout();
    webPlaybackPlayer.disconnect();
    setIsAuthenticated(false);
    setCurrentTrack(null);
    setIsPlayerReady(false);
    setDeviceId(null);
  };

  // Generate shuffled play order
  const generatePlayOrder = (length: number, currentIndex?: number) => {
    const order = Array.from({ length }, (_, i) => i);
    if (shuffle) {
      // Fisher-Yates shuffle
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      // If we have a current index, make sure it's first
      if (currentIndex !== undefined) {
        const currentPos = order.indexOf(currentIndex);
        if (currentPos > 0) {
          [order[0], order[currentPos]] = [order[currentPos], order[0]];
        }
      }
    }
    return order;
  };

  const playTrack = async (trackUri: string, trackIndex?: number) => {
    try {
      // Use our web player's device ID if available
      await spotifyService.playTrack(trackUri, deviceId || undefined);
      setCurrentTrack(trackUri);
      setIsPlaying(true);
      
      if (trackIndex !== undefined) {
        setCurrentTrackIndex(trackIndex);
        
        // Generate new play order when starting a new playlist or if order doesn't exist
        if (currentPlaylist) {
          if (playOrder.length === 0 || playOrder.length !== currentPlaylist.songs.length) {
            const newOrder = generatePlayOrder(currentPlaylist.songs.length, trackIndex);
            setPlayOrder(newOrder);
          }
        }
      }
    } catch (error) {
      console.error('Error playing track:', error);
      throw error;
    }
  };

  const pausePlayback = async () => {
    try {
      await spotifyService.pausePlayback();
      setIsPlaying(false);
    } catch (error) {
      console.error('Error pausing playback:', error);
      throw error;
    }
  };

  const resumePlayback = async () => {
    try {
      await spotifyService.resumePlayback();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error resuming playback:', error);
      throw error;
    }
  };

  const nextTrack = async () => {
    if (!currentPlaylist || currentTrackIndex === null) return;

    // Ensure we have a play order
    let order = playOrder;
    if (order.length === 0 || order.length !== currentPlaylist.songs.length) {
      order = generatePlayOrder(currentPlaylist.songs.length, currentTrackIndex);
      setPlayOrder(order);
    }
    
    const currentOrderIndex = order.indexOf(currentTrackIndex);
    
    if (currentOrderIndex < order.length - 1) {
      const nextIndex = order[currentOrderIndex + 1];
      const nextSong = currentPlaylist.songs[nextIndex];
      
      if (nextSong.uri) {
        await playTrack(nextSong.uri, nextIndex);
      } else {
        // Search for the track if URI not available
        const track = await spotifyService.searchTrack(nextSong.name, nextSong.artist);
        if (track) {
          await playTrack(track.uri, nextIndex);
        }
      }
    }
  };

  const previousTrack = async () => {
    if (!currentPlaylist || currentTrackIndex === null) return;

    // Ensure we have a play order
    let order = playOrder;
    if (order.length === 0 || order.length !== currentPlaylist.songs.length) {
      order = generatePlayOrder(currentPlaylist.songs.length, currentTrackIndex);
      setPlayOrder(order);
    }
    
    const currentOrderIndex = order.indexOf(currentTrackIndex);
    
    if (currentOrderIndex > 0) {
      const prevIndex = order[currentOrderIndex - 1];
      const prevSong = currentPlaylist.songs[prevIndex];
      
      if (prevSong.uri) {
        await playTrack(prevSong.uri, prevIndex);
      } else {
        // Search for the track if URI not available
        const track = await spotifyService.searchTrack(prevSong.name, prevSong.artist);
        if (track) {
          await playTrack(track.uri, prevIndex);
        }
      }
    }
  };

  const toggleShuffle = () => {
    const newShuffle = !shuffle;
    setShuffle(newShuffle);
    
    // Regenerate play order immediately with the new shuffle state
    if (currentPlaylist) {
      // Temporarily update shuffle state for generatePlayOrder
      const tempShuffle = newShuffle;
      const order = Array.from({ length: currentPlaylist.songs.length }, (_, i) => i);
      
      if (tempShuffle) {
        // Fisher-Yates shuffle
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [order[i], order[j]] = [order[j], order[i]];
        }
        // If we have a current index, make sure it's first
        if (currentTrackIndex !== null && currentTrackIndex !== undefined) {
          const currentPos = order.indexOf(currentTrackIndex);
          if (currentPos > 0) {
            [order[0], order[currentPos]] = [order[currentPos], order[0]];
          }
        }
      }
      
      setPlayOrder(order);
    }
  };

  const seekToPosition = async (positionMs: number) => {
    try {
      await spotifyService.seekToPosition(positionMs);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  };

  return (
    <SpotifyContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        playTrack,
        pausePlayback,
        resumePlayback,
        currentTrack,
        setCurrentTrack,
        isPlayerReady,
        currentPlaylist,
        setCurrentPlaylist,
        currentTrackIndex,
        isPlaying,
        nextTrack,
        previousTrack,
        shuffle,
        toggleShuffle,
        seekToPosition,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

