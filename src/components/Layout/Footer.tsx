import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>?';
const SCRAMBLE_LENGTH = 6;

const ScrambledText: React.FC = () => {
  const [text, setText] = useState('??????');

  useEffect(() => {
    const interval = setInterval(() => {
      const newText = Array.from({ length: SCRAMBLE_LENGTH }, () => 
        CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join('');
      setText(newText);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <span>{text}</span>;
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__content">
          <p className="footer__text">
            © {currentYear} Ben Meeker. All rights reserved.
          </p>
          
          <div className="footer__links">
            <a
              href="https://github.com/ben-meeker"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ben-meeker-5059ab161"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <a
              href="mailto:ben@meekers.org"
              className="footer__link"
              aria-label="Email"
            >
              Email
            </a>
            <Link
              to="/0x7f8a3e"
              className="footer__link footer__link--cryptic"
              aria-label="???"
            >
              <ScrambledText />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

