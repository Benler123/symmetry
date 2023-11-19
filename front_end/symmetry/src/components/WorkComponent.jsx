import React from "react";

const WorkComponent = ({ tasks }) => {
  // Check if teamHours is undefined or empty
  if (!tasks || Object.keys(tasks).length === 0) {
    return (
      <div>
        <h2 style={{ fontSize: "2em", color: "#FFFFFF" }}>Your team spent</h2>
        <p style={{ fontSize: "2em", color: "#FFFFFF" }}>No data available</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: "2em", color: "#FFFFFF" }}>Your team spent</h2>
      <ul style={{ fontSize: "2em", color: "#FFFFFF" }}>
        {Object.entries(tasks).map(([task, time]) => (
          <li key={task}>
            {time} hours {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkComponent;
