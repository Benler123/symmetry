import React, { useState, useEffect } from 'react';
import colors from '../resources/colors';
const WorkGradComponent = ({ value, backgroundColor }) => {
  const [opacity, setOpacity] = useState(0);
  const fillerBackground = `linear-gradient(to right, ${colors.green}, ${colors.red})`;
  const fillerStyles = {
    height: '100%',
    width: `${value}%`,
    background: fillerBackground, 
    borderRadius: 'inherit',
    textAlign: 'right',
    padding: '10px',
    transition: 'width 0.6s ease, opacity 0.6s ease',
    opacity: opacity
  };

  const containerStyles = {
    height: '15%',
    backgroundColor: backgroundColor || '#e0e0de',
    borderRadius: 5,
    overflow: 'hidden'
  };

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div style={{display:"flex", flexDirection: "column", color: "#FFFFFF", fontFamily: "'Inria Sans', sans-serif", fontSize: "1.2em"
  }}>
      <h4 style={{marginLeft: "10px"}}>78% of Tylers work was focused work</h4>

<div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={{ padding: 5, color: 'white', fontWeight: 'bold'}}></span>
      </div>
    </div>
    </div>
   
  );
};

export default WorkGradComponent;

