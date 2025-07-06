import React from 'react';
import ImageCard from './ImageCard';

const ImageGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <ImageCard key={image.id} wallpaper={image} />
      ))}
    </div>
  );
};

export default ImageGrid;