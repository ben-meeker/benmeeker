import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import './Header.css';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/library', label: 'Library' },
    { path: '/projects', label: 'Projects' },
    { path: '/historical-jams', label: 'Jams' },
    { path: '/resume', label: 'Resume' },
    { path: '/references', label: 'References' },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">Ben Meeker</span>
        </Link>

        <div className="header__actions">
          {/* Desktop Navigation */}
          <nav className="header__nav header__nav--desktop" aria-label="Main navigation">
            <ul className="header__nav-list">
              {navItems.map((item) => (
                <li key={item.path} className="header__nav-item">
                  <Link
                    to={item.path}
                    className={`header__nav-link ${
                      location.pathname === item.path ? 'header__nav-link--active' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />

          {/* Hamburger Button - Mobile Only */}
          <button
            className={`header__hamburger ${isMenuOpen ? 'header__hamburger--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="header__hamburger-line" />
            <span className="header__hamburger-line" />
            <span className="header__hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`header__overlay ${isMenuOpen ? 'header__overlay--visible' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Menu */}
      <nav 
        className={`header__mobile-nav ${isMenuOpen ? 'header__mobile-nav--open' : ''}`}
        aria-label="Mobile navigation"
      >
        <ul className="header__mobile-nav-list">
          {navItems.map((item, index) => (
            <li 
              key={item.path} 
              className="header__mobile-nav-item"
              style={{ animationDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
            >
              <Link
                to={item.path}
                className={`header__mobile-nav-link ${
                  location.pathname === item.path ? 'header__mobile-nav-link--active' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
