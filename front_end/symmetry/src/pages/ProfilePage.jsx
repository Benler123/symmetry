import React from 'react';
import { useLocation } from 'react-router-dom';
import bSteeleImage from '../resources/bensteele.svg';
import tKwokImage from '../resources/tylerkwok.svg';
import dShahImage from '../resources/dhruvshah.svg';
import mMasonImage from '../resources/mellisa.svg';
import kTaylorImage from '../resources/kimmy.svg';
import ProfileComponent from '../components/ProfileComponent';
import WorkGradComponent from '../components/WorkGradComponent';
import colors from '../resources/colors';

const ProfilePage = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');

  const profileContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  };

  const leftPanelStyle = {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    flexDirection: 'column',

  };

  const rightPanelStyle = {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',

  };
  const userImages = {
    'bsteele': bSteeleImage,
    'tkwok': tKwokImage,
    'dshah': dShahImage,
    'mmason': mMasonImage,
    'ktaylor': kTaylorImage
  };
  const userNames = {
    'bsteele': "Ben Steele",
    'tkwok': "Tyler Kwok",
    'dshah': "Dhruv Shah",
    'mmason': "Maria Mason",
    'ktaylor': "Kim Taylor"
  }
  const selectedImage = userImages[username] || bSteeleImage;
  const selectedName = userNames[username] || 'Rob Boss';

  return (
    <div style={profileContainerStyle}>
      <div style={leftPanelStyle}>
        <div style={{ marginLeft: "20px", marginTop: "20px" }}>
          <ProfileComponent profileSvg={selectedImage} name={selectedName} onClick={() => { }} />
          <div style={{ width: "50%", marginLeft: "5px" }}>
            <WorkGradComponent value={104} backgroundColor={colors.backgroundColor} />

          </div>
        </div>


        {/* Left panel content */}
      </div>
      <div style={rightPanelStyle}>
        {/* Right panel content */}
      </div>
    </div>
  );
};

export default ProfilePage;
