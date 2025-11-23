import React, { useState } from 'react';
import './MobilePlaybackInfo.css';

export const MobilePlaybackInfo: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('mobile_playback_info_dismissed') === 'true';
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('mobile_playback_info_dismissed', 'true');
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className="mobile-playback-info">
      <div className="mobile-playback-info__content">
        <div className="mobile-playback-info__icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="mobile-playback-info__text">
          <strong>Mobile Playback:</strong> Open the Spotify app on your device and start playing any song. Then you can control playback from here!
        </div>
        <button 
          className="mobile-playback-info__dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

