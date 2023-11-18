import React from 'react';
import './TeammatesHelped.css';

function TeammatesHelped({ imageUrls, text }) {
  return (
    <div className="teammates-helped-container">
      <div className="images-stack">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url} 
            alt={`Teammate ${index + 1}`} 
            className={`image-${index + 1}`} 
          />
        ))}
      </div>

    </div>
  );
}
export default TeammatesHelped;