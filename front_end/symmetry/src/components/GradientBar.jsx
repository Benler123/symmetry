import React, { useState, useEffect } from 'react';

const GradientBar = ({ value, backgroundColor }) => {
  const [opacity, setOpacity] = useState(0);
  const fillerBackground = `linear-gradient(to right, gold, ${backgroundColor})`;
  const fillerStyles = {
    height: '100%',
    width: `${value}%`,
    background: fillerBackground, 
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 0.6s ease, opacity 0.6s ease',
    opacity: opacity
  };

  const containerStyles = {
    height: '12%',
    backgroundColor: backgroundColor || '#e0e0de',
    borderRadius: 5,
    margin: '10px 0',
    overflow: 'hidden'
  };

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={{ padding: 5, color: 'white', fontWeight: 'bold' }}></span>
      </div>
    </div>
  );
};

export default GradientBar;

