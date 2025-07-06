import React from 'react';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';

const HomePage = ({ categories = [], loading, error }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-grow">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-xl text-red-400">Error loading categories: {error}</p>
            </div>
          ) : (
            <>
              {/* Featured Categories */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Popular Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {categories.slice(0, 8).map((category) => (
                    <div key={category.id} className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                      <p className="text-gray-400 text-sm">{category.query}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* How to Use Section */}
              <div className="bg-gray-800 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">How to Use</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      1
                    </div>
                    <h3 className="font-semibold text-blue-400 mb-2">Search</h3>
                    <p className="text-gray-300">Find wallpapers by category or keywords</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      2
                    </div>
                    <h3 className="font-semibold text-blue-400 mb-2">Select</h3>
                    <p className="text-gray-300">Choose your favorite wallpaper</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      3
                    </div>
                    <h3 className="font-semibold text-blue-400 mb-2">Download</h3>
                    <p className="text-gray-300">Get high-quality images instantly</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;