import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import './CategorySection.css';

const CategorySection = ({ title, categoryId, limit }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchWallpapers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `http://localhost:3001/api/wallpapers/category/${categoryId}?page=1`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch wallpapers');
        }
        
        const data = await response.json();
        setWallpapers(limit ? data.slice(0, limit) : data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWallpapers();
  }, [categoryId, limit]);

  if (error) {
    return (
      <div className="category-section">
        <h3 className="section-title">{title}</h3>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="category-section">
      <h3 className="section-title">{title}</h3>
      
      {loading ? (
        <div className="loading-grid">
          {[...Array(limit || 6)].map((_, i) => (
            <div key={i} className="image-card shimmer"></div>
          ))}
        </div>
      ) : (
        <div className="wallpaper-grid">
          {wallpapers.map(wallpaper => (
            <ImageCard key={wallpaper.id} wallpaper={wallpaper} />
          ))}
        </div>
      )}
      
      {limit && wallpapers.length >= limit && (
        <div className="view-more">
          <a href={`/category/${categoryId}`} className="view-more-btn">
            View More
          </a>
        </div>
      )}
    </div>
  );
};

export default CategorySection;