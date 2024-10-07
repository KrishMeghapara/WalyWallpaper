import React from 'react';
import './SocialLinks.css'; // Separate CSS file for styling

const SocialLinks = () => {
  return (
    <div className="social-links">
      <a href="https://github.com/KrishMeghapara" target="_blank" rel="noopener noreferrer" className="link">
        <i className="fab fa-github icon"></i> GitHub
      </a>
      <a href="https://linkedin.com/in/krish-meghapara-49571b2a7/" target="_blank" rel="noopener noreferrer" className="link">
        <i className="fab fa-linkedin icon"></i> LinkedIn
      </a>
      <a href="mailto:krishmeghapara@gmail.com" className="link">
        <i className="fas fa-envelope icon"></i> Email
      </a>
      <a href="https://x.com/KrishMeghapara?t=buJ6qUy5SjxJfFv-z_zmVQ&s=08 " target="_blank" rel="noopener noreferrer" className="link">
        <i className="fab fa-twitter icon"></i> Twitter
      </a>
      <a href="https://www.instagram.com/krish_meghapara/" target="_blank" rel="noopener noreferrer" className="link">
        <i className="fab fa-instagram icon"></i> Instagram
      </a>
    </div>
  );
};

export default SocialLinks;
