import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import './Header.css';

export const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/library', label: 'Library' },
    { path: '/projects', label: 'Projects' },
    { path: '/historical-jams', label: 'Jams' },
    { path: '/resume', label: 'Resume' },
  ];

  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
        </Link>

        <div className="header__actions">
          <nav className="header__nav" aria-label="Main navigation">
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
        </div>
      </div>
    </header>
  );
};

