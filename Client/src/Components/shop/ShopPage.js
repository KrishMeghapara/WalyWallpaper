import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../Home/Navbar';
import './ShopPage.css';  
import React from 'react';

function ShopPage() {
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);  // To store selected image info
  const [isModalOpen, setIsModalOpen] = useState(false);     // To control the modal visibility
  const [errorMsg, setErrorMsg] = useState('');              // To handle the error message

  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  // Function to open the modal and set the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    setErrorMsg('');  // Reset error message when modal opens
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Modified function to show an error message instead of downloading
  const downloadFile = async () => {
    // Display the message that the feature is currently not working
    setErrorMsg('This feature is currently not working.');
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="shop-page">
          <div className="card-container">
            {users.map(user => (
              <div className="image-card" key={user._id}>
                <img src={user.url} alt="Wallpaper" className="card-image" />
                <button className="open-popup-btn" onClick={() => openModal(user)}>Download</button>
                <div className="card-overlay">Free</div>
              </div>
            ))}
          </div>

          {/* Modal for selected image */}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close-modal" onClick={closeModal}>&times;</span>
                <div className="modal-left">
                  <img src={selectedImage.url} alt="Selected Wallpaper" className="modal-image" />
                </div>
                <div className="modal-right">
                  <h2>Download Wallpaper</h2>
                  {/* Download Button */}
                  <a onClick={downloadFile} className="download-now-btn">Download Now</a>
                  {/* Error message */}
                  {errorMsg && <p className="error-message">{errorMsg}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default ShopPage;
