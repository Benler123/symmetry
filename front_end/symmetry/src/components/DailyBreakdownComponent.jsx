import React, { useState } from "react";
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS } from 'chart.js';

ChartJS.register(ArcElement);

function DailyBreakDownComponent({ selectedDay, setSelectedDay, personName, dailyHours, weeklyTotal, summary}) {
  const days = ["M", "T", "W", "TR", "F"]; // Array of days
  const dayName = {
    "M": "Monday",
    "T": "Tuesday",
    "W": "Wednesday",
    "TR": "Thursday",
    "F": "Friday"
  }

  // Personalize day summaries with the person's name
  const daySummaries = {
    "M": `Throughout the day today, ${personName} worked hard all morning researching and programming what was talked about in this week's meetings. ${personName} met with 3 team members on 3 different occasions today.`,
    "T": `Tuesday is the peak of productivity and deep work for ${personName}. It's the day when energy levels are typically high, making it ideal for tackling the most challenging tasks.`,
    "W": `Midweek, Wednesday serves as a checkpoint for evaluating ${personName}'s week's progress. It's a time for reviewing goals and strategies.`,
    "Th": `Thursday is for collaboration and meetings for ${personName}. It's an opportunity to sync with the team and assess progress.`,
    "F": `Friday is about wrapping up and reflection for ${personName}. It's a time to finish tasks, review the week's achievements, and prepare for the next week.`
  };

  const percentages = {
    "M": 26,
    "T": 34,
    "W": 17,
    "TR": 22,
    "F": 8
  }

  const [selectedDaySummary, setSelectedDaySummary] = useState(daySummaries["M"]); // Set initial summary

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedDaySummary(daySummaries[day]);
  };

  const data = {
    labels: ["working", "not"],
    datasets: [{
      data: [dailyHours[selectedDay] / weeklyTotal * 100, 100 - (dailyHours[selectedDay] / weeklyTotal * 100)],
      backgroundColor: ['#FFFFFF', '#46BFBD'],
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "'Inria Sans', sans-serif", color: "#FFFFFF" , width: "100%"}}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", marginTop: "40px" , width: "80%"}}>
        {days.map(day => (
          <div
            key={day}
            onClick={() => handleDayClick(day)}
            style={{
              cursor: "pointer",
              padding: "5px",
              border: selectedDay === day ? "1px solid grey" : "none"
            }}
          >
            {day}
          </div>
        ))}
      </div>
      <div style={{marginBottom: "0px"}}>
        <p style={{fontSize: "1.4em", maxHeight: "13vh", height: "13vh", marginBottom: "40px", transform: "translateY(0px)"}}>{summary}</p>
      </div>

     <div style={{ marginTop: "45px" ,display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ width: '80%', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'translateX(-120px)' }}>
          <Pie data={data} options={chartOptions} />
        </div>
        <h3 style={{ transform: 'translateX(-210px) translateY(-20px)' }}>  {dayName[selectedDay]} made up {Math.round(dailyHours[selectedDay] / weeklyTotal * 100,4)}% of {personName}'s work this week</h3>
      </div>
    </div>
  );
}

export default DailyBreakDownComponent;