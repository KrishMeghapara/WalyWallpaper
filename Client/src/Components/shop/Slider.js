import React from 'react';
import './Slider.css'; // Add your styles here

const Slider = ({ currentPage, setPage, totalPages }) => {
  return (
    <div className="slider">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          className={`slider-button ${currentPage === index + 1 ? 'active' : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Slider;
