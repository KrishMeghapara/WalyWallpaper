import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ImageGrid from '../components/ImageGrid';

const SearchPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const searchTerm = query || 'wallpaper';
        const response = await fetch(`http://localhost:3001/api/wallpapers?query=${encodeURIComponent(searchTerm)}&per_page=20`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-400">
              Showing results for <span className="font-semibold text-blue-400">"{query}"</span>
            </p>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-xl text-red-400 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-4">No images found. Try a different search term.</p>
            <div className="text-gray-500">
              <p>Try searching for: nature, cars, anime, space, mountains, ocean</p>
            </div>
          </div>
        ) : (
          <ImageGrid images={images} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;