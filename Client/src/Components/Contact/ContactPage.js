import React from 'react';
import Navbar from '../Home/Navbar';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="contact-page">
          <div className="content-wrapper">
            <ContactInfo />
            <p className="slogan">
              "Connect with WalyWallpaper — The World of Wallpapers at Your Fingertips!"
            </p>
            <SocialLinks />
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
