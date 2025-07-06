// src/Components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">WalyWallpaper</div>
            <p className="footer-tagline">High Quality Wallpapers</p>
          </div>
          
          <div className="footer-links">
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
          
          <p className="copyright">
            © {currentYear} WalyWallpaper. Built by Krish Meghapara
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;