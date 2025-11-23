import React, { useState } from 'react';
import { useSpotify } from '../../hooks/useSpotify';
import './SpotifyAuthNotification.css';

export const SpotifyAuthNotification: React.FC = () => {
  const { isAuthenticated, login } = useSpotify();
  const [isDismissed, setIsDismissed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated || isDismissed) {
    return null;
  }

  const handleConnect = () => {
    try {
      login();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Spotify');
      console.error('Spotify connection error:', err);
    }
  };

  return (
    <div className="spotify-auth-notification">
      <div className="spotify-auth-notification__content">
        <div className="spotify-auth-notification__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
        
        <div className="spotify-auth-notification__text">
          <div className="spotify-auth-notification__title">Stream Songs</div>
          <div className="spotify-auth-notification__subtitle">Connect your account</div>
        </div>

        <button 
          className="spotify-auth-notification__button"
          onClick={handleConnect}
          aria-label="Connect with Spotify"
        >
          Connect
        </button>
        
        {error && (
          <div className="spotify-auth-notification__error" title={error}>
            Setup required
          </div>
        )}

        <button 
          className="spotify-auth-notification__close"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss notification"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 4L4 12M4 4l8 8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

