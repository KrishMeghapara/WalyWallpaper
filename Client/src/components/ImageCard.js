import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const ImageCard = ({ wallpaper }) => {
  const [loaded, setLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  
  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDownloading(true);
    
    try {
      // Track download in backend
      await fetch('http://localhost:3001/api/track-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId: wallpaper.id })
      });
      
      // Trigger download
      const link = document.createElement('a');
      link.href = wallpaper.fullUrl;
      link.download = `wallpaper-${wallpaper.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => setDownloading(false), 2000);
    } catch (err) {
      console.error('Download error:', err);
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-200 hover:scale-105">
      <div className="relative" style={{ backgroundColor: wallpaper.avg_color || '#f5f5f5' }}>
        {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl" />}
        <img
          src={wallpaper.url}
          alt={wallpaper.alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-48 object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className="flex flex-col flex-1 p-4 justify-between">
        <div className="mb-2">
          <a
            href={wallpaper.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm font-medium text-gray-700 hover:text-blue-500 truncate"
          >
            {wallpaper.photographer}
          </a>
        </div>
        <button
          className="mt-auto flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
          onClick={handleDownload}
          disabled={downloading}
        >
          <FaDownload />
          {downloading ? 'Downloading...' : 'Download'}
        </button>
      </div>
    </div>
  );
};

export default ImageCard;