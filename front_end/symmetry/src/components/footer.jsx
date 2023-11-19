import React from 'react';
import logo1 from '../resources/symLogo.svg'; // Replace with actual path to logo
import logo2 from '../resources/8openai.svg'; // Replace with actual path to logo
import arrow from '../resources/arrow.svg'; // Replace with actual path to logo
import { Link } from 'react-router-dom';

const Footer = () => {
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
      <Link to="/chat" style={{ textDecoration: 'none', color: 'inherit' }}> {/* Add style here to remove underline and change color */}
  <>
    <img style={{ maxHeight: "20px" }} src={arrow} />
    <span style={{ fontSize: '1.8em', color: "#FFFFFF"}}>  Chat</span> {/* Use span to increase font size */}
  </>
</Link>
      <img src={logo2} alt="Logo 2" style={{ height: '25px' }} /> {/* Adjust size as needed */}
    </footer>
  );
};

export default Footer;