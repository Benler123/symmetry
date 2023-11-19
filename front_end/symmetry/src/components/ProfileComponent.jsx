import React from 'react';

const ProfileComponent = ({ profileSvg, name, onClick }) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'left',
        color: "#FFFFFF",
        fontSize: "1.5em",
        cursor: "pointer" 
      }}
      onClick={() => onClick(name)}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={profileSvg} alt='profile' style={{ marginRight: "30px", paddingTop:"10px", paddingBottom:"10px", maxHeight:"80%"}}></img>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default ProfileComponent;
