// Spotify Web Playback SDK Integration
// Creates a player instance in the browser

export class WebPlaybackPlayer {
  private player: Spotify.Player | null = null;
  private deviceId: string | null = null;
  private isReady: boolean = false;

  /**
   * Initialize and connect the Web Playback SDK player
   */
  async initialize(accessToken: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      // Wait for Spotify SDK to be loaded
      if (!window.Spotify) {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
          this.createPlayer(accessToken, resolve, reject);
        };
      } else {
        this.createPlayer(accessToken, resolve, reject);
      }
    });
  }

  private createPlayer(
    accessToken: string,
    resolve: (deviceId: string | null) => void,
    reject: (error: any) => void
  ) {
    this.player = new window.Spotify!.Player({
      name: 'Historical Jams Web Player',
      getOAuthToken: (cb: (token: string) => void) => {
        cb(accessToken);
      },
      volume: 0.8,
    });

    // Error handling
    this.player!.addListener('initialization_error', ({ message }: { message: string }) => {
      console.error('Initialization error:', message);
      reject(new Error(message));
    });

    this.player!.addListener('authentication_error', ({ message }: { message: string }) => {
      console.error('Authentication error:', message);
      reject(new Error(message));
    });

    this.player!.addListener('account_error', ({ message }: { message: string }) => {
      console.error('Account error:', message);
      reject(new Error('Spotify Premium required'));
    });

    this.player!.addListener('playback_error', ({ message }: { message: string }) => {
      console.error('Playback error:', message);
    });

    // Ready event
    this.player!.addListener('ready', ({ device_id }: { device_id: string }) => {
      console.log('Web Playback SDK is ready! Device ID:', device_id);
      this.deviceId = device_id;
      this.isReady = true;
      resolve(device_id);
    });

    this.player!.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.log('Device not ready:', device_id);
      this.isReady = false;
    });

    // Connect to the player
    this.player!.connect();
  }

  /**
   * Get the device ID for this player
   */
  getDeviceId(): string | null {
    return this.deviceId;
  }

  /**
   * Check if player is ready
   */
  isPlayerReady(): boolean {
    return this.isReady;
  }

  /**
   * Disconnect and clean up the player
   */
  disconnect() {
    if (this.player) {
      this.player.disconnect();
      this.player = null;
      this.deviceId = null;
      this.isReady = false;
    }
  }

  /**
   * Get the player instance
   */
  getPlayer(): Spotify.Player | null {
    return this.player;
  }

  /**
   * Get current playback state
   */
  async getCurrentState(): Promise<Spotify.PlaybackState | null> {
    if (!this.player) {
      return null;
    }
    try {
      return await this.player.getCurrentState();
    } catch (error) {
      console.error('Error getting current state:', error);
      return null;
    }
  }
}

export const webPlaybackPlayer = new WebPlaybackPlayer();

