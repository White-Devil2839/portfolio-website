import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2025 Divyansh Choudhary. All rights reserved.</p>
          <div className="social-links">
            <a href="https://github.com/White-Devil2839" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;