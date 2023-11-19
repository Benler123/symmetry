import React, { useState, useEffect } from "react";
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
import Footer from "../components/footer";

ChartJS.register(ArcElement);
function ManagerPage() {
  const [teamHours, setTeamHours] = useState();
  const [focusedHours, setFocusedHours] = useState();
  const [cumulativeHours, setCumulativeHours] = useState();
  const [dataPoints, setDataPoints] = useState([22, 44, 55]);
  const [bulletPointItems, setBulletPointItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8001/get_team_hours", {
      method: "GET",
      headers: {
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTeamHours(data)
        setDataPoints(Object.values(data))
        setCumulativeHours(Object.values(data).reduce((accumulator, currentValue) => accumulator + currentValue, 0))
        const excludedCategories = ["Meeting", "Scheduling", "Off-Topic"];
        setFocusedHours(Object.entries(data)
          .filter(([key, value]) => !excludedCategories.includes(key))
          .map(([key, value]) => value).reduce((accumulator, currentValue) => accumulator + currentValue, 0))
        console.log(data)
        const colors = [
          '#F7464A', // Red
          '#46BFBD', // Blue
          '#FDB45C', // Yellow
          '#949FB1', // Green
          '#4D5360', // Purple
          '#8A2BE2', // Dark Blue
          '#FFD700', // Gold
        ];

        const ites = Object.keys(data).map((key, index) => {
          const colorIndex = index % colors.length; // Repeat colors if more categories than colors
          return {
            color: colors[colorIndex],
            text: `${data[key]} Hours ${key}`
          };
        });
        setBulletPointItems(ites);

        console.log(bulletPointItems);

      })
      .catch((error) => console.log(error));
  }, []);
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
  // const bulletPointItems = [
  //   { color: '#FFD700', text: '85 Hours Programming' },
  //   { color: '#8A2BE2', text: '16 Hours Debugging' },
  //   // Assuming teal represents creative work
  //   { color: '#FDB45C', text: '22 Hours Working With a Team' },
  //   // Assuming red represents administrative tasks
  //   { color: '#949FB1', text: '28 Hours in Meetings' }
  // ];

  const labels = mockTasks.map(task => task[0]);
  //const dataPoints = mockTasks.map(task => task[1]);

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
        '#8A2BE2', // Dark Blue
        '#FFD700', // Gold
        // Add more colors if needed, matching the Figma design
      ],
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Ensuring the container takes at least the full viewport height
      backgroundColor: colors.backgroundColor
    }}>
      <HeaderComponent />
      <div style={{
        flex: 1, // Allows this div to grow and fill available space
        display: 'flex'
        // ... other styles ...
      }}>
        <div style={{ width: '21%', backgroundColor: colors.backgroundColor, padding: '20px', flexDirection: "column" }}>
          <ProfileComponent profileSvg={bSteeleImage} name={"Ben Steele"} onClick={() => handleProfileClick("bsteele")} />
          <ProfileComponent profileSvg={tKwokImage} name={"Tyler Kwok"} onClick={() => handleProfileClick("tkwok")} />
          <ProfileComponent profileSvg={dhruvImage} name={"Dhruv Shah"} onClick={() => handleProfileClick("dshah")} />
          <ProfileComponent profileSvg={mattImage} name={"Matt Steele"} onClick={() => handleProfileClick("msteele")} />
        </div>
        <div style={{ width: '79%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 3, backgroundColor: colors.backgroundColor, padding: '20px', color: "white" }}>
            <GradientBar value={cumulativeHours * 2} backgroundColor={colors.backgroundColor} width={"80%"} />
            <h1 style={{ textAlign: 'left' }}>Your team spent {cumulativeHours} Cumulative Hours This week on Their Tasks</h1>
            <GradientBar value={focusedHours * 2} backgroundColor={colors.backgroundColor} width={'60%'} />
            <h1 style={{ textAlign: 'left' }}>Your team was focused for {focusedHours} Hours this week</h1>
          </div>
          <div style={{ flex: 3, backgroundColor: colors.backgroundColor, padding: '20px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '55%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Adjusted width and added paddingRight */}
              <Pie data={data} options={chartOptions} />
            </div>
            <div style={{ color: '#FFFFFF', width: '45%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: 'translateX(-90px)', }}> {/* Adjusted width and added paddingLeft */}
              <ColoredBullets items={bulletPointItems} />
            </div>
          </div>
        </div>
        {/* Your teammates profiles or other content */}
      </div>
      <Footer style={{
        position: 'absolute', // Absolute positioning
        bottom: '0', // Positioned at the bottom
        width: '100%', // Ensuring footer stretches across the width
        // Other styles for your footer
      }} />
    </div>
  );
}

export default ManagerPage;
