import React from 'react';
import './ImageCard.css'; // Create separate CSS for the card

const ImageCard = ({ imageSrc, onClick }) => {
  return (
    <div className="image-card" onClick={() => onClick(imageSrc)}>
      <img src={imageSrc} alt="Wallpaper" />
    </div>
  );
};

export default ImageCard;
