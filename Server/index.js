require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const fetch = require('node-fetch');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  }
});
app.use('/api', apiLimiter);

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
if (!PEXELS_API_KEY) {
  console.error('❌ Missing Pexels API key in .env file');
  console.error('Please create a .env file with your PEXELS_API_KEY');
  console.error('Get your free API key from: https://www.pexels.com/api/');
  process.exit(1);
}

// Cache system
const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Popular wallpaper categories
const CATEGORIES = [
  { id: 'nature', name: 'Nature', query: 'nature landscape' },
  { id: 'anime', name: 'Anime', query: 'anime wallpaper' },
  { id: 'cars', name: 'Cars', query: 'luxury cars' },
  { id: 'ocean', name: 'Ocean', query: 'ocean waves' },
  { id: 'mountains', name: 'Mountains', query: 'mountain landscape' },
  { id: 'gaming', name: 'Gaming', query: 'gaming wallpaper' },
  { id: 'fantasy', name: 'Fantasy', query: 'fantasy art' },
  { id: 'futuristic', name: 'Futuristic', query: 'futuristic city' },
  { id: 'abstract', name: 'Abstract', query: 'abstract background' },
  { id: 'space', name: 'Space', query: 'space galaxy' }
];

// API Routes

// Get all categories
app.get('/api/categories', (req, res) => {
  try {
    res.json(CATEGORIES);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search wallpapers
app.get('/api/wallpapers', async (req, res) => {
  try {
    const { query, page = 1, per_page = 15 } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ 
        error: 'Query parameter is required',
        message: 'Please provide a search query'
      });
    }
    
    const cacheKey = `${query}-${page}-${per_page}`;
    
    // Check cache
    if (cache.has(cacheKey)) {
      const { timestamp, data } = cache.get(cacheKey);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return res.json(data);
      }
    }
    
    // Fetch from Pexels API
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${per_page}&page=${page}&orientation=landscape`,
      {
        headers: { 
          Authorization: PEXELS_API_KEY,
          'User-Agent': 'WalyWallpaper/1.0'
        }
      }
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`Pexels API error: ${response.status} - ${error}`);
      
      if (response.status === 429) {
        return res.status(429).json({ 
          error: 'Rate limit exceeded',
          message: 'Please wait before making more requests'
        });
      }
      
      throw new Error(`Pexels API error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    
    // Format response
    const wallpapers = data.photos.map(photo => ({
      id: photo.id,
      url: photo.src.large2x || photo.src.original,
      fullUrl: photo.src.original,
      photographer: photo.photographer,
      photographer_url: photo.photographer_url,
      avg_color: photo.avg_color,
      width: photo.width,
      height: photo.height,
      alt: photo.alt || `${query} wallpaper`
    }));
    
    // Update cache
    cache.set(cacheKey, { 
      timestamp: Date.now(), 
      data: wallpapers 
    });
    
    res.json(wallpapers);
  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).json({ 
      error: 'Failed to fetch wallpapers',
      message: err.message.includes('Rate Limit') 
        ? 'Please wait before making more requests' 
        : 'An error occurred while fetching wallpapers'
    });
  }
});

// Get wallpapers by category
app.get('/api/wallpapers/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { page = 1 } = req.query;
    
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category) {
      return res.status(404).json({ 
        error: 'Category not found',
        message: 'The requested category does not exist'
      });
    }
    
    // Use the search endpoint with category query
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(category.query)}&per_page=15&page=${page}&orientation=landscape`,
      {
        headers: { 
          Authorization: PEXELS_API_KEY,
          'User-Agent': 'WalyWallpaper/1.0'
        }
      }
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`Pexels API error: ${response.status} - ${error}`);
      throw new Error(`Pexels API error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    
    const wallpapers = data.photos.map(photo => ({
      id: photo.id,
      url: photo.src.large2x || photo.src.original,
      fullUrl: photo.src.original,
      photographer: photo.photographer,
      photographer_url: photo.photographer_url,
      avg_color: photo.avg_color,
      width: photo.width,
      height: photo.height,
      alt: photo.alt || `${category.name} wallpaper`
    }));
    
    res.json(wallpapers);
  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).json({ 
      error: 'Failed to fetch wallpapers',
      message: err.message
    });
  }
});

// Download tracking
app.post('/api/track-download', (req, res) => {
  try {
    const { imageId } = req.body;
    if (!imageId) {
      return res.status(400).json({ 
        error: 'Missing imageId',
        message: 'Image ID is required for tracking downloads'
      });
    }
    
    console.log(`📥 Download tracked for image: ${imageId}`);
    res.status(200).json({ 
      success: true,
      message: 'Download tracked successfully'
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    res.status(500).json({ 
      error: 'Failed to track download',
      message: 'An error occurred while tracking the download'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    pexelsKey: PEXELS_API_KEY ? 'configured' : 'missing'
  });
});

// API Documentation
app.get('/api', (req, res) => {
  res.json({
    name: 'WalyWallpaper API',
    version: '1.0.0',
    description: 'A wallpaper discovery and download API',
    endpoints: {
      'GET /api/categories': 'Get all available categories',
      'GET /api/wallpapers': 'Search wallpapers by query',
      'GET /api/wallpapers/category/:id': 'Get wallpapers by category',
      'POST /api/track-download': 'Track wallpaper downloads',
      'GET /health': 'Health check endpoint'
    },
    documentation: 'https://github.com/yourusername/walywallpaper'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.originalUrl} does not exist`,
    availableEndpoints: [
      '/api/categories',
      '/api/wallpapers',
      '/api/wallpapers/category/:id',
      '/api/track-download',
      '/health',
      '/api'
    ]
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on the server'
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 Pexels API key: ${PEXELS_API_KEY ? '✅ Loaded' : '❌ MISSING!'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api`);
});