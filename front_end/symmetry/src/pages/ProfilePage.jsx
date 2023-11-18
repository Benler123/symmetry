import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import bSteeleImage from '../resources/bensteele.svg';
import tKwokImage from '../resources/tylerkwok.svg';
import dShahImage from '../resources/dhruvshah.svg';
import mMasonImage from '../resources/mellisa.svg';
import kTaylorImage from '../resources/kimmy.svg';
import ProfileComponent from '../components/ProfileComponent';
import WorkGradComponent from '../components/WorkGradComponent';
import colors from '../resources/colors';
import ColoredBullets from '../components/ColoredBullets/ColoredBullets';

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
    backgroundColor: colors.backgroundColor,
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
  const mockTasks = [
    ['Programming', 21],
    ['Team Sessions', 2],
    ['Assisting Team Members', 9],
    ['Meetings', 12],
  ];
  const labels = mockTasks.map(task => task[0]);
  const dataPoints = mockTasks.map(task => task[1]);
  const data = {
    labels: labels, 
    datasets: [{
      data: dataPoints, 
      backgroundColor: [
        '#F7464A', // Red
        '#46BFBD', // Blue
        '#FDB45C', // Yellow
        '#949FB1', // Green
        '#4D5360', // Purple
        // Add more colors if needed, matching the Figma design
      ],
      borderWidth: 0,
    }],
  };
  const chartOptions = {
    maintainAspectRatio: false, 
  };
  const selectedImage = userImages[username] || bSteeleImage;
  const selectedName = userNames[username] || 'Rob Boss';

  const imageUrls = [
    bSteeleImage,
    kTaylorImage,
    mMasonImage
  ];

  const bulletPointItems = [
    { color: '#FFD700', text: '12 Hours Debugging' },
    { color: '#8A2BE2', text: '2 Hours in Team Sessions' },
    // ... add other bullet points as needed
  ];

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
        {/* Right panel content */
        <div style={{ width: '40%', height: '40%'}}>
            <Pie data={data} options={chartOptions} />
            <ColoredBullets items={bulletPointItems} />
            </div>
        }
      </div>
    </div>
  );
};

export default ProfilePage;
