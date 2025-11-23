import React, { useEffect, useRef } from 'react';
import './LogoMarquee.css';

interface LogoMarqueeProps {
  logos: Array<{ src: string; alt: string }>;
}

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const positionRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    // Calculate the width of one set of logos
    const firstLogo = track.querySelector('.logo-marquee__logo');
    if (!firstLogo) return;
    
    // Wait for images to load and get accurate measurements
    const updateWidth = () => {
      const logoElements = Array.from(track.querySelectorAll('.logo-marquee__logo'));
      const gap = 48; // 3rem = 48px
      const singleSetWidth = logoElements.slice(0, logos.length).reduce((total, logo) => {
        return total + (logo as HTMLElement).offsetWidth + gap;
      }, 0);
      
      singleSetWidthRef.current = singleSetWidth;
      return singleSetWidth;
    };
    
    const animate = () => {
      positionRef.current -= 0.5; // Adjust speed here (pixels per frame)
      
      // When we've moved exactly one set width, reset to 0
      if (Math.abs(positionRef.current) >= singleSetWidthRef.current) {
        positionRef.current = 0;
      }
      
      track.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Wait a bit for images to load
    const initTimeout = setTimeout(() => {
      updateWidth();
      animate();
    }, 100);
    
    // Handle window resize
    const handleResize = () => {
      updateWidth();
      // Reset position to avoid jumps
      positionRef.current = 0;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(initTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [logos.length]);
  
  // Create enough duplicates to ensure seamless scrolling
  const duplicatedLogos = [...logos, ...logos, ...logos];
  
  return (
    <div className="logo-marquee">
      <div className="logo-marquee__track" ref={trackRef}>
        {duplicatedLogos.map((logo, index) => (
          <img
            key={`logo-${index}`}
            src={logo.src}
            alt={logo.alt}
            className="logo-marquee__logo"
          />
        ))}
      </div>
    </div>
  );
};

