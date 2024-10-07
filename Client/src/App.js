import './App.css';
import Navbar from './Components/Home/Navbar';
import AdBanner from './Components/Home/AdBanner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactPage from './Components/Contact/ContactPage';
import HomePage from './Components/Home/HomePage';
import axios from 'axios';
import { useEffect, useState } from 'react';  // Add useState here
import ShopPage from './Components/shop/ShopPage';
import AboutUs from './Components/AboutUs/AboutUsPage';

function App() {

  return(
  <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<HomePage/>}/>
          <Route path='/WalyWallpaper' element={<HomePage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
