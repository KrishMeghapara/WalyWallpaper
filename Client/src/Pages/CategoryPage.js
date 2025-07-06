import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageGrid from '../components/ImageGrid';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, get category info
        const categoriesResponse = await fetch('http://localhost:3001/api/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categories = await categoriesResponse.json();
        const currentCategory = categories.find(c => c.id === categoryId);
        
        if (!currentCategory) {
          throw new Error('Category not found');
        }
        
        setCategory(currentCategory);

        // Then, get wallpapers for this category
        const wallpapersResponse = await fetch(`http://localhost:3001/api/wallpapers/category/${categoryId}?page=1`);
        if (!wallpapersResponse.ok) {
          throw new Error('Failed to fetch wallpapers');
        }
        
        const data = await wallpapersResponse.json();
        setWallpapers(data);
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-300">
            {category ? category.name : 'Category'}
          </span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          {category && (
            <>
              <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
              <p className="text-gray-400 text-lg">
                Discover amazing {category.name.toLowerCase()} wallpapers
              </p>
            </>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-xl text-red-400 mb-4">Error: {error}</p>
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        ) : wallpapers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-4">No wallpapers found in this category.</p>
            <Link to="/" className="btn-primary">
              Browse Other Categories
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-400">
                Found {wallpapers.length} wallpapers
              </p>
            </div>
            <ImageGrid images={wallpapers} />
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;