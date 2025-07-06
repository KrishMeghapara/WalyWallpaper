import React, { useEffect } from 'react';
import './Lightbox.css';

const Lightbox = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close">
          &times;
        </button>
        
        <img 
          src={image.fullUrl} 
          alt={`Wallpaper by ${image.photographer}`} 
          className="lightbox-image"
        />
        
        <div className="lightbox-info">
          <div className="info-left">
            <h3>Photo by <a href={image.photographer_url} target="_blank" rel="noreferrer">{image.photographer}</a></h3>
            <div className="image-meta">
              {image.width && image.height && (
                <span>Resolution: {image.width}×{image.height}</span>
              )}
              <span>Likes: {image.likes || 0}</span>
            </div>
          </div>
          
          <div className="info-right">
            <a 
              href={image.fullUrl} 
              className="download-link"
              download={`wallpaper-${image.id}.jpg`}
              onClick={e => e.stopPropagation()}
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;