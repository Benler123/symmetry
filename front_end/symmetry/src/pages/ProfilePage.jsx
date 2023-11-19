import React from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import bSteeleImage from '../resources/bensteele.svg';
import tKwokImage from '../resources/tylerkwok.svg';
import dShahImage from '../resources/dhruvshah.svg';
import msteeleImage from '../resources/matt.svg'
import ProfileComponent from '../components/ProfileComponent';
import WorkGradComponent from '../components/WorkGradComponent';
import colors from '../resources/colors';
import ColoredBullets from '../components/ColoredBullets/ColoredBullets';
import DailyBreakDownComponent from '../components/DailyBreakdownComponent';


const ProfilePage = () => {
  const location = useLocation();
  const [selectedDay, setSelectedDay] = useState("M");

  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');

  const profileContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  };
  
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white',
        fontSize: 16
      }
    }
  };

  const leftPanelStyle = {
    flex: 5,
    backgroundColor: colors.backgroundColor,
    flexDirection: 'column',
    marginLeft: '60px',
  };

  const rightPanelStyle = {
    flex: 4,
    backgroundColor: colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'left',
    fontFamily: "'Inria Sans', sans-serif",
    color: "#FFFFFF",

  };
  const userImages = {
    'bsteele': bSteeleImage,
    'tkwok': tKwokImage,
    'dshah': dShahImage,
    'mteele': msteeleImage
  };
  const userNames = {
    'bsteele': "Ben Steele",
    'tkwok': "Tyler Kwok",
    'dshah': "Dhruv Shah",
    'msteele':"Matt Steele"
  }
  const mockTasks = [
    ['Programming', 21],
    ['Team Sessions', 2],
    ['Assisting Team Members', 9],
    ['Meetings', 12],
  ];
  const focusedScore = {
    "M": 78,
    "T": 82,
    "W": 20,
    "TR": 76,
    "F": 78
  }
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
      ],
      borderWidth: 0,
    }],
  };

  const selectedImage = userImages[username] || msteeleImage;
  const selectedName = userNames[username] || 'Rob Boss';

  const imageUrls = [
    bSteeleImage,
    msteeleImage,
    tKwokImage,
    dShahImage
  ];

  const bulletPointItems = [
    { color: '#FFD700', text: '12 Hours Debugging' },
    { color: '#8A2BE2', text: '2 Hours in Team Sessions' },
    // Assuming teal represents creative work
    { color: '#FDB45C', text: '4 Hours in Creative Design' },
    // Assuming red represents administrative tasks
    { color: '#949FB1', text: '3 Hours on Administrative Tasks' }
  ];
  

  return (
    <div style={profileContainerStyle}>
      <div style={leftPanelStyle}>
        <div style={{ marginLeft: "20px", marginTop: "20px", transform: 'translateY(30px)'}}>
          <ProfileComponent profileSvg={selectedImage} name={selectedName} onClick={() => { }} />
          <div style={{ width: "70%", marginLeft: "5px" }}>
            <WorkGradComponent value={focusedScore[selectedDay]} focusedWorkPercent={focusedScore[selectedDay]} backgroundColor={colors.backgroundColor} />
          </div>
          <div style={{ width: "85%", marginLeft: "5px"}}>
            {/* Pass the selectedName as personName prop to DailyBreakDownComponent */}
            <DailyBreakDownComponent selectedDay={selectedDay} setSelectedDay={setSelectedDay} personName={selectedName}></DailyBreakDownComponent>
          </div>
        </div>


        {/* Left panel content */}
      </div>
      <div style={rightPanelStyle}>
        <div style={{ width: '50%', height: '50%', marginLeft: "14vw"}}>
            <Pie style ={{transform: 'translateX(-80px)'}}data={data} options={chartOptions} />
            <h2 style={{justifyContent: 'center', marginLeft: "10px",  transform: 'translateY(-40px) translateX(-90px)', fontSize: "1.7em"}}>This week, Tyler spent</h2>
            <div style={{transform: 'translateY(-40px) translateX(-20px)'}}><ColoredBullets items={bulletPointItems} /></div>
            </div>
      </div>
    </div>
  );
};

export default ProfilePage;
