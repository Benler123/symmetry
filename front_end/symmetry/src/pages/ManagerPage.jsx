import React from "react";
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS } from 'chart.js';
import HeaderComponent from '../components/HeaderComponent';
import GradientBar from '../components/GradientBar';
import colors from '../resources/colors';
import ProfileComponent from '../components/ProfileComponent';
import bSteeleImage from '../resources/bensteele.svg';
import tKwokImage from '../resources/tylerkwok.svg';
import mattImage from '../resources/matt.svg';
import dhruvImage from '../resources/dhruvshah.svg'
import { useNavigate } from "react-router-dom";
import ColoredBullets from '../components/ColoredBullets/ColoredBullets';

ChartJS.register(ArcElement);
function ManagerPage() {
  const navigate = useNavigate();

  const handleProfileClick = (name) => {
    console.log(name);
    navigate(`/profile?username=${name}`);
    
  };
  const mockTasks = [
    ['Programming', 21],
    ['Team Sessions', 2],
    ['Assisting Team Members', 9],
    ['Meetings', 12],
  ];
  const bulletPointItems = [
    { color: '#FFD700', text: '85 Hours Programming' },
    { color: '#8A2BE2', text: '16 Hours Eebugging' },
    // Assuming teal represents creative work
    { color: '#FDB45C', text: '22 Hours Working With a Team' },
    // Assuming red represents administrative tasks
    { color: '#949FB1', text: '28 Hours in Meetings' }
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
  return (
    <div style={{ backgroundColor: colors.backgroundColor }}>
      <HeaderComponent />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '21%', backgroundColor: colors.backgroundColor, padding: '20px', flexDirection: "column"}}>
        <ProfileComponent profileSvg={bSteeleImage} name={"Ben Steele"} onClick={() => handleProfileClick("bsteele")} />
          <ProfileComponent profileSvg={tKwokImage} name={"Tyler Kwok"} onClick={() => handleProfileClick("tkwok")} />
          <ProfileComponent profileSvg={dhruvImage} name={"Dhruv Shah"} onClick={() => handleProfileClick("dshah")} />
          <ProfileComponent profileSvg={mattImage} name={"Matt Steele"} onClick={() => handleProfileClick("msteele")} />
        </div>
        <div style={{ width: '82%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 3, backgroundColor: colors.backgroundColor, padding: '20px', color: "white"}}>
          <GradientBar value={104} backgroundColor={colors.backgroundColor} width={"80%"} />
          <h1 style={{ textAlign: 'left' }}>Your team spent 197 Cumulative Hours This week on Their Tasks</h1>
          <GradientBar value={200} backgroundColor={colors.backgroundColor} width={'60%'}/>
          <h1 style={{ textAlign: 'left' }}>Your team was focused for 152 Cumulative Hours this week</h1>
        </div>
          <div style={{ flex: 3, backgroundColor: colors.backgroundColor, padding: '20px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '50%', height: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Pie data={data} options={chartOptions} />
            </div>
            <div style={{ color: '#FFFFFF', width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ColoredBullets items={bulletPointItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerPage;
