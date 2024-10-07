import React from 'react';
import './AdBanner.css';
import { Link } from 'react-router-dom';

const AdBanner = () => {
  return (
    <div className="ad-banner">
      <div className="ad-content">
        <h2 className="ad-title">Exclusive Offer at WalyWallpaper!</h2>
        <p className="ad-description">
          Buy any wallpaper right now and get it for <strong>FREE!</strong>
        </p>
        <p className="offer-img">🛒</p> {/* Shopping cart emoji */}
        <Link className="shop-now-btn" to='/shop'>Shop Now</Link>
      </div>
    </div>
  );
};

export default AdBanner;
