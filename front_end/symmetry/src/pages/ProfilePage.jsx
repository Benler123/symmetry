import React from 'react';
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for version 6
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
import Footer from '../components/footer';
//
const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const goBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };
  const location = useLocation();
  const [selectedDay, setSelectedDay] = useState("M");
  const [blockData, setBlockData] = useState({});
  const [weekData, setWeekData] = useState({});
  const[activityData, setActivityData] = useState({});
  const [totalHoursPerDay, setTotalHoursPerDay] = useState({});
  const [focusedHoursPerDay, setFocusedHoursPerDay] = useState({});
  const [totalWeeklyHours, setTotalWeeklyHours] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8001/matts_endpoint/{user}/{start_date}", {
      method: "GET",
      headers: {
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBlockData(data)
        const newTotalHours = {};
        const newFocusedHours = {};
        let weeklyHours = 0;
        const activityTotals = {};

        Object.entries(data).forEach(([day, { activities }]) => {
            let totalHours = 0;
            let focusedHours = 0;

            Object.entries(activities).forEach(([activity, hours]) => {
                totalHours += hours;
                if (!["Scheduling", "Meeting", "Off-Topic"].includes(activity)) {
                    focusedHours += hours;
                }

                // Aggregate activity hours for the week
                activityTotals[activity] = (activityTotals[activity] || 0) + hours;
            });

            newTotalHours[day] = totalHours;
            newFocusedHours[day] = focusedHours;
            weeklyHours += totalHours;
        });

        setTotalHoursPerDay(newTotalHours);
        setFocusedHoursPerDay(newFocusedHours);
        setTotalWeeklyHours(weeklyHours);
        setWeekData(activityTotals);
        console.log(weeklyHours)
        console.log(newTotalHours)
        
      })
      .catch((error) => console.log(error));
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');

  const profileContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Full viewport height
  };

  const footerHeight = 30; // Assume footer height is 50px

  const mainContentStyle = {
    flex:'1',
    display: 'flex',
    flexDirection: 'row',
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
  const selectedName = (userNames[username] || 'Rob Boss').split(" ")[0];;

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

  const backButtonStyle = {
    position: 'absolute', // This positions the element relative to its first positioned (not static) ancestor element
    top: 0, // Aligns the top edge of the element at the top of the parent
    left: 0, // Aligns the left edge of the element at the left of the parent
    display: 'flex',
    alignItems: 'center',
    padding: '10px', // Add some padding for better spacing
    color: 'white', // Sets the text color to white
    cursor: 'pointer'
  };
  

  return (
    <div style={profileContainerStyle}>
      <div style={mainContentStyle}>
    <div onClick={goBack} style={backButtonStyle}>
      <span style={{ fontSize: '24px' }}>&#x2190;</span> {/* Unicode Left Arrow */}
      <span style={{ marginTop: '3px', marginLeft: '5px', fontSize: '16px' }}>Back to your team</span> {/* Small text label */}
    </div>
      <div style={leftPanelStyle}>
        <div style={{ marginLeft: "20px", marginTop: "20px", transform: 'translateY(30px)'}}>
          <ProfileComponent profileSvg={selectedImage} name={selectedName} onClick={() => { }} />
          <div style={{ width: "70%", marginLeft: "5px",}}>
            <WorkGradComponent value={focusedScore[selectedDay]} focusedWorkPercent={focusedScore[selectedDay]} backgroundColor={colors.backgroundColor} />
          </div>
          <div style={{ width: "85%", marginLeft: "5px"}}>
            {/* Pass the selectedName as personName prop to DailyBreakDownComponent */}
            <DailyBreakDownComponent selectedDay={selectedDay} setSelectedDay={setSelectedDay} personName={selectedName} weeklyTotal = {totalWeeklyHours} dailyHours = {totalHoursPerDay}></DailyBreakDownComponent>
          </div>
        </div>
        {/* Left panel content */}
      </div>
      <div style={rightPanelStyle}>
        <div style={{ width: '50%', height: '50%', marginLeft: "14vw"}}>
            <Pie style ={{transform: 'translateX(-140px)'}}data={data} options={chartOptions} />
            <h2 style={{ justifyContent: 'center', marginLeft: "10px", transform: 'translateY(-40px) translateX(-120px)', fontSize: "1.7em" }}>
            This week, {selectedName} spent:</h2>
            <div style={{transform: 'translateY(-40px) translateX(-140px)'}}><ColoredBullets items={bulletPointItems} /></div>
            </div>
      </div>
      </div>
      <Footer /> {/* Place Footer component here */}
    </div>
  );
};

export default ProfilePage;
