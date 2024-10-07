import React from 'react';
import './AboutUsPage.css'; // Create a CSS file for styling
import Navbar from '../Home/Navbar';

function AboutUs() {
  return (

    <>
    <header>
    <Navbar/>
    </header>
    <main>

    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to WalyWallpaper! This website was created as part of my 
        project for Darshan University, Semester 3: Web Technology (WT) project.
      </p>
      <p>
        I developed this site using the MERN stack, which includes MongoDB, 
        Express.js, React.js, and Node.js. The combination of these powerful 
        technologies allows for a seamless and dynamic user experience.
      </p>
      <p>
        Additionally, I utilized ChatGPT AI to assist in various aspects of 
        the development process, providing insights and guidance throughout the 
        project.
      </p>
      <p>
        Thank you for visiting, and I hope you enjoy exploring the vibrant 
        wallpapers we have to offer!
      </p>

      <div className="logos-container">
        <h2>Technologies Used</h2>
        <div className="logos">
          <img src="https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Logo.png" alt="MongoDB Logo" className="logo" />
          <img src="https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2019/07/express-logo-528x240.png" alt="Express Logo" className="logo" />
          <img src="https://media.licdn.com/dms/image/v2/D5612AQE7A9az3VXM0Q/article-cover_image-shrink_423_752/article-cover_image-shrink_423_752/0/1667398918313?e=1733356800&v=beta&t=knR6WnI_tTtTFX4ZthoU7xEOTvBE3Oy2MTe1-QKWzOo" alt="React Logo" className="logo" />
          <img src="https://www.svgrepo.com/show/303360/nodejs-logo.svg" alt="Node.js Logo" className="logo" />
          <img src="https://www.ilovephd.com/wp-content/uploads/2023/03/ChatGPT-Logo.png" alt="ChatGPT Logo" className="logo" />
        </div>
      </div>
    </div>

    </main>
    </>
  );
}

export default AboutUs;
