import React, { useState, useEffect } from 'react';
import colors from '../resources/colors';
const WorkGradComponent = ({ backgroundColor, focusedWorkPercent }) => {
  const [opacity, setOpacity] = useState(0);
  const fillerBackground = `linear-gradient(to right, ${colors.green}, ${colors.red})`;
  const fillerStyles = {
    height: '100%',
    width: `${focusedWorkPercent }%`,
    background: fillerBackground, 
    borderRadius: 'inherit',
    textAlign: 'right',
    padding: '10px',
    transition: 'width 0.6s ease, opacity 0.6s ease',
    opacity: opacity
  };

  const containerStyles = {
    maxHeight: '5vh',
    height: "2.5vh",
    backgroundColor: backgroundColor || '#e0e0de',
    borderRadius: 1,
    overflow: 'hidden',
  };

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div style={{display:"flex", flexDirection: "column", color: "#FFFFFF", fontFamily: "'Inria Sans', sans-serif", fontSize: "1.2em"
  }}>
      <h4 style={{    transform: 'translateY(20px)'
,marginLeft: "10px", fontSize: "1.4em"}}>{Math.round(focusedWorkPercent,4)}% of your work was focused work</h4>

<div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={{ padding: 5, color: 'white', fontWeight: 'bold'}}></span>
      </div>
    </div>
    </div>
   
  );
};

export default WorkGradComponent;

