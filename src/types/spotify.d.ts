// Type definitions for Spotify Web Playback SDK

interface Window {
  onSpotifyWebPlaybackSDKReady?: () => void;
  Spotify?: {
    Player: Spotify.PlayerConstructor;
  };
}

declare namespace Spotify {
  interface PlayerOptions {
    name: string;
    getOAuthToken: (cb: (token: string) => void) => void;
    volume?: number;
    enableMediaSession?: boolean;
  }

  interface PlayerConstructor {
    new (options: PlayerOptions): Player;
  }

  interface Player {
    connect(): Promise<boolean>;
    disconnect(): void;
    addListener(event: string, callback: (data: unknown) => void): boolean;
    removeListener(event: string, callback?: (data: unknown) => void): boolean;
    getCurrentState(): Promise<PlaybackState | null>;
    setName(name: string): Promise<void>;
    getVolume(): Promise<number>;
    setVolume(volume: number): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    togglePlay(): Promise<void>;
    seek(position_ms: number): Promise<void>;
    previousTrack(): Promise<void>;
    nextTrack(): Promise<void>;
    activateElement(): Promise<void>;
  }

  interface PlaybackState {
    context: {
      uri: string | null;
      metadata: Record<string, unknown>;
    };
    disallows: {
      pausing?: boolean;
      peeking_next?: boolean;
      peeking_prev?: boolean;
      resuming?: boolean;
      seeking?: boolean;
      skipping_next?: boolean;
      skipping_prev?: boolean;
    };
    paused: boolean;
    position: number;
    repeat_mode: number;
    shuffle: boolean;
    track_window: {
      current_track: Track;
      previous_tracks: Track[];
      next_tracks: Track[];
    };
  }

  interface Track {
    uri: string;
    id: string | null;
    type: 'track' | 'episode' | 'ad';
    media_type: 'audio' | 'video';
    name: string;
    is_playable: boolean;
    duration_ms: number;
    album: {
      uri: string;
      name: string;
      images: { url: string }[];
    };
    artists: { uri: string; name: string }[];
  }

  interface Error {
    message: string;
  }
}

