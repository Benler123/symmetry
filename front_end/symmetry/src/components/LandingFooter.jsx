import React from 'react';
import logo1 from '../resources/symLogo.svg'; // Replace with actual path to logo
import logo2 from '../resources/8openai.svg'; // Replace with actual path to logo
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between', // This will place the logos at opposite ends
    alignItems: 'center',
    padding: '10px 20px', // Adjust padding as needed
    width: '97%', // Ensure footer extends full width
  };

  return (
    <footer style={footerStyle}>
      <img src={logo1} alt="Logo 1" style={{ height: '25px' }} /> {/* Adjust size as needed */}
      <img src={logo2} alt="Logo 2" style={{ height: '25px' }} /> {/* Adjust size as needed */}
    </footer>
  );
};

export default LandingFooter;