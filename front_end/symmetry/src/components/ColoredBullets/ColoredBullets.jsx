import React from 'react';
import './ColoredBullets.css'; 

const ColoredBulletPoints = ({ items }) => {
  return (
    <div className="bullet-points-container">
      {items.map((item, index) => (
        <div key={index} className="bullet-point-item">
          <span className="bullet-marker" style={{ backgroundColor: item.color }}></span>
          <span className="bullet-text">{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ColoredBulletPoints;