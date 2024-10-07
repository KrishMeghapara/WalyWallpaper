import React from 'react';
import './ImageModal.css'; // Separate modal CSS

const ImageModal = ({ imageSrc, closeModal }) => {
  return (
    <div id="imageModal" className="modal" style={{ display: imageSrc ? 'block' : 'none' }}>
      <span className="close" onClick={closeModal}>&times;</span>
      <img id="modalImage" className="modal-content" src={imageSrc} alt="Selected Wallpaper" />
      <div className="download-btn">
        <button>Download</button> {/* To be functional later */}
      </div>
    </div>
  );
};

export default ImageModal;
