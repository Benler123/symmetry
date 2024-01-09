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
  const [selectedDay, setSelectedDay] = useState("TR");
  const [blockData, setBlockData] = useState({
    "M": {
      "summary": "Throughout the day today, Tyler worked hard all morning researching and programming what was talked about in this week's meetings. He met with 3 team members on 3 different occasions today, at 10:30 AM, 1:30 PM, and 4:00 PM. While he was mostly focused today he had a few times where he was not working and he wasn't doing anything",
      "activities": {
        "Coding": 3,
        "Browsing": 1,
        "Meeting": 2,
        "Communicating": 1,
        "Off-Topic": 1
      }
    },
    "T": {
      "summary": "Tuesday is the peak of productivity and deep work. It's the day when energy levels are typically high, making it ideal for tackling the most challenging and complex tasks. Emphasis is on concentration and effective execution of tasks that require significant mental effort or creativity. This day is about maximizing output and making substantial progress on key projects.",
      "activities": {
        "Coding": 4,
        "Browsing": 1,
        "Scheduling": 2,
        "Communicating": 1
      }
    },
    "W": {
      "summary": "Midweek, Wednesday serves as a checkpoint for evaluating the week's progress. It's a time for reviewing goals, strategies, and tasks to ensure everything is on track. Adjustments and recalibrations are made as needed. This day often involves reassessing priorities and refocusing.",
      "activities": {
        "Meeting": 2,
        "Communicating": 2,
        "Scheduling": 2,
        "Chatting": 2
      }
    },
    "TR": {
      "summary": "Thursday is for collaboration and meetings. It's an opportunity to sync with the team and assess progress. The day is geared towards teamwork, sharing ideas, and collectively addressing challenges. It's a crucial time for communication, building consensus, and ensuring that everyone is contributing effectively towards common goals.",
      "activities": {
        "Meeting": 3,
        "Communicating": 3,
        "Chatting": 2
      }
    },
    "F": {
      "summary": "Friday is about wrapping up and reflection. It's a time to finish tasks, review the week's achievements, and prepare for the next week. The focus is on closing pending issues, reflecting on accomplishments and learnings, and setting the stage for a seamless transition into the upcoming week. It's also a day for personal and professional growth reflections.",
      "activities": {
        "Coding": 2,
        "Browsing": 1,
        "Scheduling": 2,
        "Communicating": 2,
        "Off-Topic": 1
      }
    }
  }
  );
  const [weekData, setWeekData] = useState({});
  const [activityData, setActivityData] = useState({});
  const [dataPoints, setDataPoints] = useState([22, 44, 55]);

  const [totalHoursPerDay, setTotalHoursPerDay] = useState({
    "M": 0,
    "T": 0,
    "W": 0,
    "TR": 0,
    "F": 0
  });
  const [focusedHoursPerDay, setFocusedHoursPerDay] = useState({
    "M": 0,
    "T": 0,
    "W": 0,
    "TR": 0,
    "F": 0
  });
  const [totalWeeklyHours, setTotalWeeklyHours] = useState(-1);
  const [bulletPointItems, setBulletPointItems] = useState([]);


  useEffect(() => {
    console.log("The data for bullet endpoint is about to be fetched?")

    fetch("http://127.0.0.1:8001/week_user_data/Tyler%20Kwok/2023-11-14", {
      method: "GET",
      headers: {
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("hello I am the actual data")
        console.log(data)

        let totalHours = 0;

        Object.values(data).forEach(day => {
          const dayHours = Object.values(day.activities).reduce((sum, current) => sum + current, 0);
          totalHours += dayHours;
        });
        const transformedData = {};

        Object.keys(data).forEach(day => {
          const activities = data[day].activities;
          const maxHours = Math.max(0, ...Object.values(activities)); // Defaults to 0 if no activities
          transformedData[day] = maxHours;
        });
        setTotalWeeklyHours(totalHours)
        transformedData["TR"] = transformedData["Th"]
        transformedData["Th"] = 0
  
        setTotalHoursPerDay(transformedData)

        console.log("transformed")
        console.log(transformedData)

      })
      .catch((error) => console.log(error));


    fetch("http://127.0.0.1:8001/matts_endpoint/Tyler%20Kwok/2023-11-15", {
      method: "GET",
      headers: {
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("The data for matts endpoint is fetched?")
        console.log(data)
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
          console.log(day + " has total hours of " + totalHours + " and focused hours of " + focusedHours)
          newTotalHours[day] = totalHours;
          console.log("new total hours: ")
          console.log(newTotalHours)
          newFocusedHours[day] = focusedHours;
          weeklyHours += totalHours;
        });
        const colors = [
          '#F7464A', // Red
          '#46BFBD', // Blue
          '#FDB45C', // Yellow
          '#949FB1', // Green
          '#4D5360', // Purple
          '#8A2BE2', // Dark Blue
          '#FFD700', // Gold
        ];

        const ites = Object.keys(activityTotals).map((key, index) => {
          const colorIndex = index % colors.length; // Repeat colors if more categories than colors
          return {
            color: colors[colorIndex],
            text: `${activityTotals[key]} Hours ${key}`
          };
        });
        setDataPoints(Object.values(activityTotals))

        setBulletPointItems(ites);
        console.log(newTotalHours)
        //newTotalHours["TR"] = newTotalHours["Th"];
        setTotalHoursPerDay(newTotalHours);
        setFocusedHoursPerDay(newFocusedHours);
        console.log("new focused hourds")
        console.log(newFocusedHours)
        setTotalWeeklyHours(weeklyHours);
        setWeekData(activityTotals);


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
    flex: '1',
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
    'msteele': "Matt Steele"
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

  // const bulletPointItems = [
  //   { color: '#FFD700', text: '12 Hours Debugging' },
  //   { color: '#8A2BE2', text: '2 Hours in Team Sessions' },
  //   // Assuming teal represents creative work
  //   { color: '#FDB45C', text: '4 Hours in Creative Design' },
  //   // Assuming red represents administrative tasks
  //   { color: '#949FB1', text: '3 Hours on Administrative Tasks' }
  // ];

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
          <div style={{ marginLeft: "20px", marginTop: "20px", transform: 'translateY(30px)' }}>
            <ProfileComponent profileSvg={selectedImage} name={selectedName} onClick={() => { }} />
            <div style={{ width: "70%", marginLeft: "5px", }}>
              <WorkGradComponent focusedWorkPercent={
                totalHoursPerDay[selectedDay] === 0
                  ? 0
                  : focusedHoursPerDay[selectedDay] / totalHoursPerDay[selectedDay] * 100 > 100
                    ? 55
                    : (focusedHoursPerDay[selectedDay] / totalHoursPerDay[selectedDay]) * 100
              }

                backgroundColor={colors.backgroundColor} />
            </div>
            <div style={{ width: "85%", marginLeft: "5px" }}>
              {blockData[selectedDay] && <DailyBreakDownComponent selectedDay={selectedDay} setSelectedDay={setSelectedDay} personName={selectedName} weeklyTotal={totalWeeklyHours} dailyHours={totalHoursPerDay} summary={blockData[selectedDay].summary}></DailyBreakDownComponent>}          </div>
          </div>
          {/* Left panel content */}
        </div>
        <div style={rightPanelStyle}>
          <div style={{ width: '50%', height: '50%', marginLeft: "14vw" }}>
            <Pie style={{ transform: 'translateX(-140px)' }} data={data} options={chartOptions} />
            <h2 style={{ justifyContent: 'center', marginLeft: "10px", transform: 'translateY(-40px) translateX(-120px)', fontSize: "1.7em" }}>
              This week, {selectedName} spent:</h2>
            <div style={{ transform: 'translateY(-40px) translateX(-140px)' }}><ColoredBullets items={bulletPointItems} /></div>
          </div>
        </div>
      </div>
      <Footer /> {/* Place Footer component here */}
    </div>
  );
};

export default ProfilePage;
