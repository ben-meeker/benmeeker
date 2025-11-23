// Spotify Web API Integration - Using Authorization Code Flow with PKCE
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:5173/historical-jams';
const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-modify-playback-state',
  'user-read-playback-state'
].join(' ');

// Helper functions for PKCE
function generateCodeVerifier(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  duration_ms: number;
  preview_url: string | null;
  uri: string;
}

export interface SpotifyAuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
}

class SpotifyService {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor() {
    // Check if there's a token in localStorage
    const savedToken = localStorage.getItem('spotify_access_token');
    const savedExpiry = localStorage.getItem('spotify_token_expiry');
    
    if (savedToken && savedExpiry) {
      const expiryTime = parseInt(savedExpiry, 10);
      if (Date.now() < expiryTime) {
        this.accessToken = savedToken;
        this.tokenExpiry = expiryTime;
      } else {
        this.clearToken();
      }
    }
  }

  /**
   * Generate the Spotify authorization URL using PKCE
   */
  async getAuthUrl(): Promise<string> {
    if (!CLIENT_ID) {
      throw new Error('Spotify Client ID not configured. Please set VITE_SPOTIFY_CLIENT_ID in your .env file.');
    }
    
    // Generate code verifier and challenge for PKCE
    const codeVerifier = generateCodeVerifier(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    // Store code verifier for later use
    localStorage.setItem('code_verifier', codeVerifier);
    
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });
    
    return `${authEndpoint}?${params.toString()}`;
  }

  /**
   * Handle the callback from Spotify (exchange code for token using PKCE)
   */
  async handleCallback(): Promise<boolean> {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (!code) return false;

    const codeVerifier = localStorage.getItem('code_verifier');
    if (!codeVerifier) {
      console.error('Code verifier not found');
      return false;
    }

    try {
      // Exchange code for access token
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const data = await response.json();
      
      if (data.access_token && data.expires_in) {
        const expiryTime = Date.now() + data.expires_in * 1000;
        
        this.accessToken = data.access_token;
        this.tokenExpiry = expiryTime;
        
        localStorage.setItem('spotify_access_token', data.access_token);
        localStorage.setItem('spotify_token_expiry', expiryTime.toString());
        localStorage.removeItem('code_verifier');
        
        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        return true;
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      localStorage.removeItem('code_verifier');
    }

    return false;
  }

  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return this.accessToken !== null && 
           this.tokenExpiry !== null && 
           Date.now() < this.tokenExpiry;
  }

  /**
   * Get the current access token
   */
  getAccessToken(): string | null {
    return this.isAuthenticated() ? this.accessToken : null;
  }

  /**
   * Log out and clear tokens
   */
  logout(): void {
    this.clearToken();
  }

  private clearToken(): void {
    this.accessToken = null;
    this.tokenExpiry = null;
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_token_expiry');
  }

  /**
   * Play a track on the specified device (or user's active device)
   */
  async playTrack(trackUri: string, deviceId?: string): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const url = deviceId 
        ? `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`
        : 'https://api.spotify.com/v1/me/player/play';

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [trackUri],
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No active device. Please wait for the player to initialize.');
        }
        if (response.status === 403) {
          throw new Error('Spotify Premium required for playback control');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to play track');
      }
    } catch (error) {
      console.error('Error playing track:', error);
      throw error;
    }
  }

  /**
   * Pause playback
   */
  async pausePlayback(): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok && response.status !== 204) {
        throw new Error('Failed to pause playback');
      }
    } catch (error) {
      console.error('Error pausing playback:', error);
      throw error;
    }
  }

  /**
   * Resume playback
   */
  async resumePlayback(): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok && response.status !== 204) {
        throw new Error('Failed to resume playback');
      }
    } catch (error) {
      console.error('Error resuming playback:', error);
      throw error;
    }
  }

  /**
   * Get the current playback state
   */
  async getCurrentPlayback(): Promise<unknown> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting playback state:', error);
      return null;
    }
  }

  /**
   * Search for a track by name and artist
   */
  async searchTrack(trackName: string, artistName: string): Promise<SpotifyTrack | null> {
    if (!this.isAuthenticated()) {
      return null;
    }

    try {
      const query = encodeURIComponent(`track:${trackName} artist:${artistName}`);
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      
      if (data.tracks && data.tracks.items.length > 0) {
        return data.tracks.items[0];
      }

      return null;
    } catch (error) {
      console.error('Error searching track:', error);
      return null;
    }
  }

  /**
   * Seek to a position in the currently playing track
   */
  async seekToPosition(positionMs: number): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/seek?position_ms=${positionMs}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok && response.status !== 204) {
        throw new Error('Failed to seek');
      }
    } catch (error) {
      console.error('Error seeking:', error);
      throw error;
    }
  }
}

export const spotifyService = new SpotifyService();

