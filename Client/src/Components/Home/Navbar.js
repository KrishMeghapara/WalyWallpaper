import React from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
    <div className="navbar">
      <div className="title">
        <h1>WalyWallpaper</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
    </>
  );
};

export default Navbar;
