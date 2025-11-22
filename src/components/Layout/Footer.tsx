import React from 'react';
import './Footer.css';

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
          </div>
        </div>
      </div>
    </footer>
  );
};

