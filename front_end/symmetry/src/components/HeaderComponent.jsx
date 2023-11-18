import React from 'react';
import greenCircle from "../resources/greencircle.svg"
const HeaderComponent = (teamName) => {
  const divStyle = { 
    padding: "1.3em",
    marginTop: "2vh",
    fontFamily: "'Inria Sans', sans-serif",
    fontWeight: 800,
    fontSize: "1em",
    alignItems: "space-between",
    color: "#FFFFFF"
  };  
  return (
    <div style={{...divStyle, display: 'flex', justifyContent: 'space-between'}}>
       <h1> AI ATL Team</h1>
       <div style={{display:"flex"}}>
       <img src={greenCircle} alt="green circle" style={{width: "4em", height: "4em", marginRight: "20px"}}/>
       <h3> Matt</h3>
       </div>
    </div>
  );
};

export default HeaderComponent;

