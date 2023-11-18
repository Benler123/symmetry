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
        marginBottom: "3vh",
        cursor: "pointer" 
      }}
      onClick={() => onClick(name)}
    >
      <img src={profileSvg} alt='profile' style={{ marginRight: "30px", width: "auto", maxHeight: "80%" }}></img>
      <p>{name}</p>
    </div>
  );
};

export default ProfileComponent;
