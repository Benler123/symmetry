import React from 'react';

const WorkComponent = ({ tasks }) => {
  return (
    <div>
      <h2 style={{fontSize: "2em", color: "#FFFFFF"}}>You spent</h2>
      <ul style={{fontSize: "2em",    color: "#FFFFFF" }}>
        {tasks.map(([task, time]) => (
          <li key={task}>
            {time} hours {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkComponent;