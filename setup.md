# Quick Setup Guide 🚀

## Step 1: Backend Setup

1. Open a terminal and navigate to the Server folder:
```bash
cd Server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Server folder with your Pexels API key:
```env
PEXELS_API_KEY=your_pexels_api_key_here
PORT=3001
NODE_ENV=development
```

4. Get your free Pexels API key:
   - Go to: https://www.pexels.com/api/
   - Sign up for free
   - Copy your API key
   - Paste it in the .env file

5. Start the server:
```bash
npm run dev
```

## Step 2: Frontend Setup

1. Open a new terminal and navigate to the client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm start
```

## Step 3: Test the Application

- Backend will run on: http://localhost:3001
- Frontend will run on: http://localhost:3000
- API docs: http://localhost:3001/api
- Health check: http://localhost:3001/health

## What's Been Improved ✅

### Frontend (Client)
- ✅ Added Tailwind CSS for consistent styling
- ✅ Fixed import path issues
- ✅ Improved error handling and loading states
- ✅ Made CategoryPage functional
- ✅ Updated SearchPage to use real API
- ✅ Enhanced responsive design
- ✅ Added proper navigation

### Backend (Server)
- ✅ Enhanced error handling
- ✅ Added better logging
- ✅ Improved API documentation
- ✅ Added rate limiting
- ✅ Enhanced security with Helmet
- ✅ Better CORS configuration
- ✅ Added health check endpoint

### Project Structure
- ✅ Created comprehensive README
- ✅ Added proper package.json configurations
- ✅ Set up Tailwind CSS configuration
- ✅ Added PostCSS configuration

## Next Steps 🎯

1. Get your Pexels API key
2. Create the .env file
3. Start both servers
4. Test the application
5. Customize as needed!

## Troubleshooting 🔧

If you encounter issues:
1. Make sure both servers are running
2. Check that your Pexels API key is correct
3. Verify the .env file is in the Server folder
4. Check the console for error messages 