import React, { useState } from "react";
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS } from 'chart.js';

ChartJS.register(ArcElement);

function DailyBreakDownComponent( {selectedDay, setSelectedDay}) {
  const days = ["M", "T", "W", "TR", "F"]; // Array of days
  const dayName = {
    "M": "Monday",
    "T": "Tuesday",
    "W": "Wednesday",
    "TR": "Thursday",
    "F": "Friday"
  }

  const daySummaries = {
    "M": "Throughout the day today,  Tyler worked hard all morning researching and programming what was talked about in this  weeks meetings. He met with 3 team members on 3 differentoccasions today, at 10:30 AM, 1:30 PM, and 4:00 PM. While he  was mostly focused today he had a few times where he was not working and he wasn't doing anything",
    "T": "Tuesday is the peak of productivity and deep work. It's the day when energy levels are typically high, making it ideal for tackling the most challenging and complex tasks. Emphasis is on concentration and effective execution of tasks that require significant mental effort or creativity. This day is about maximizing output and making substantial progress on key projects.",
    "W": "Midweek, Wednesday serves as a checkpoint for evaluating the week's progress. It's a time for reviewing goals, strategies, and tasks to ensure everything is on track. Adjustments and recalibrations are made as needed. This day often involves reassessing priorities and refocusing.",
    "TR": "Thursday is for collaboration and meetings. It's an opportunity to sync with the team and assess progress. The day is geared towards teamwork, sharing ideas, and collectively addressing challenges. It's a crucial time for communication, building consensus, and ensuring that everyone is contributing effectively towards common goals.",
    "F": "Friday is about wrapping up and reflection. It's a time to finish tasks, review the week's achievements, and prepare for the next week. The focus is on closing pending issues, reflecting on accomplishments and learnings, and setting the stage for a seamless transition into the upcoming week. It's also a day for personal and professional growth reflections."
  };

  const percentages = {
    "M": 26,
    "T": 34,
    "W": 17,
    "TR": 22,
    "F": 8
  }
  

  // Initialize selectedDay and selectedDaySummary with values for Monday
  const [selectedDaySummary, setSelectedDaySummary] = useState(daySummaries["M"]); // Set Monday's summary

  // Function to handle day click
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedDaySummary(daySummaries[day]);
  };
  const data = {
    labels: ["working", "not"],
    datasets: [{
      data: [percentages[selectedDay], 100 - percentages[selectedDay]],
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
      <p style={{fontSize: "1.4em", maxHeight: "13vh", height: "13vh", marginBottom: "80px", transform: "translateY(-25px)"}}>{selectedDaySummary}</p> {/* Display the summary for the selected day */}
      </div>

     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
  <div style={{ width: '70%', height: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'translateX(-120px)' }}>
    <Pie data={data} options={chartOptions} />
  </div>
  <h3 style={{ transform: 'translateX(-210px) translateY(-20px)' }}>  {dayName[selectedDay]} made up {percentages[selectedDay]}% of Tyler's work this week</h3>
</div>


    </div>
  );
}

export default DailyBreakDownComponent;
