import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="hero flex items-center justify-center min-h-[400px] bg-gradient-to-b from-black/60 to-black/80 relative" style={{backgroundImage: `url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="hero-content text-center text-white max-w-xl mx-auto bg-black/40 rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Stunning Wallpapers</h1>
        <p className="text-lg md:text-xl mb-8">High-quality backgrounds for every device and mood</p>
        <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wallpapers..."
            aria-label="Search wallpapers"
            className="flex-1 px-4 py-3 rounded-l-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-r-full flex items-center justify-center transition-colors duration-200">
            <FaSearch className="text-lg" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;