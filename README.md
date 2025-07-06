# WalyWallpaper 🖼️

A modern wallpaper discovery and download platform built with React and Node.js, powered by the Pexels API.

## Features ✨

- **Beautiful UI**: Modern, responsive design with dark theme
- **Search Functionality**: Search wallpapers by keywords
- **Category Browsing**: Browse wallpapers by popular categories
- **High-Quality Images**: Get high-resolution wallpapers from Pexels
- **Download Tracking**: Track download statistics
- **Mobile Responsive**: Works perfectly on all devices
- **Fast Loading**: Optimized with caching and lazy loading

## Tech Stack 🛠️

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express.js
- Pexels API
- Rate limiting
- CORS enabled
- Helmet for security

## Prerequisites 📋

- Node.js (v14 or higher)
- npm or yarn
- Pexels API key (free)

## Setup Instructions 🚀

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd WalyWallpaper
```

### 2. Backend Setup

1. Navigate to the server directory:
```bash
cd Server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Server directory:
```env
PEXELS_API_KEY=your_pexels_api_key_here
PORT=3001
NODE_ENV=development
```

4. Get your free Pexels API key:
   - Visit [https://www.pexels.com/api/](https://www.pexels.com/api/)
   - Sign up for a free account
   - Copy your API key
   - Paste it in the `.env` file

5. Start the server:
```bash
npm run dev
```

The server will start on `http://localhost:3001`

### 3. Frontend Setup

1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints 📡

- `GET /api/categories` - Get all available categories
- `GET /api/wallpapers?query=<search_term>` - Search wallpapers
- `GET /api/wallpapers/category/:id` - Get wallpapers by category
- `POST /api/track-download` - Track wallpaper downloads
- `GET /health` - Health check endpoint
- `GET /api` - API documentation

## Project Structure 📁

```
WalyWallpaper/
├── client/                 # Frontend React app
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── Pages/         # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── Server/                 # Backend Node.js app
│   ├── index.js           # Main server file
│   ├── package.json
│   └── .env              # Environment variables
└── README.md
```

## Available Scripts 📜

### Backend (Server directory)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend (Client directory)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Environment Variables 🔧

### Backend (.env file)
```env
PEXELS_API_KEY=your_pexels_api_key_here
PORT=3001
NODE_ENV=development
```

## Features in Detail 🎯

### Homepage
- Hero section with search functionality
- Popular categories display
- How-to-use guide

### Search Page
- Real-time search results
- Loading states
- Error handling
- Responsive grid layout

### Category Page
- Category-specific wallpapers
- Breadcrumb navigation
- Loading and error states

### Image Cards
- High-quality image display
- Download functionality
- Photographer attribution
- Hover effects

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License 📄

This project is licensed under the MIT License.

## Author 👨‍💻

**Krish Meghapara**

## Support 💬

If you encounter any issues or have questions:
1. Check the API documentation at `http://localhost:3001/api`
2. Verify your Pexels API key is correct
3. Check the server logs for errors
4. Open an issue on GitHub

## Acknowledgments 🙏

- [Pexels](https://www.pexels.com/) for providing the amazing wallpaper API
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling framework
- [React](https://reactjs.org/) for the amazing frontend framework 
