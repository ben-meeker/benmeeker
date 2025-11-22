import React from 'react';
import './LogoMarquee.css';

interface LogoMarqueeProps {
  logos: Array<{ src: string; alt: string }>;
}

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos }) => {
  return (
    <div className="logo-marquee">
      <div className="logo-marquee__track">
        {/* Render 3 sets for extra smooth looping */}
        {[...Array(3)].map((_, setIndex) => (
          logos.map((logo, logoIndex) => (
            <img
              key={`set${setIndex}-${logoIndex}`}
              src={logo.src}
              alt={logo.alt}
              className="logo-marquee__logo"
            />
          ))
        ))}
      </div>
    </div>
  );
};

