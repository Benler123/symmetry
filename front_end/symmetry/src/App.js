import './App.css';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS } from 'chart.js';
import HeaderComponent from './components/HeaderComponent';
import WorkComponent from './components/WorkComponent';
import GradientBar from './components/GradientBar';
import colors from './resources/colors';
import ProfileComponent from './components/ProfileComponent';
import basicman from './resources/basicman.svg';

ChartJS.register(ArcElement);
function App() {
  const handleProfileClick = (name) => {
    console.log(name);
  };
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
      borderWidth: 1,
    }],
  };
  
  

  const chartOptions = {
    maintainAspectRatio: false, 
  };
  return (
    <div style={{ backgroundColor: colors.backgroundColor, minHeight: "100vh", minWidth: "100vw" }}>
      <HeaderComponent />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 105px)' }}>
        <div style={{ width: '18%', backgroundColor: colors.backgroundColor, padding: '20px', flexDirection: "column"}}>
        <ProfileComponent profileSvg={basicman} name={"Rob Boss"} onClick={() => handleProfileClick("Rob Boss")} />
          <ProfileComponent profileSvg={basicman} name={"Bob Moss"} onClick={() => handleProfileClick("Bob Moss")} />
          <ProfileComponent profileSvg={basicman} name={"Cob Loss"} onClick={() => handleProfileClick("Cob Loss")} />
          <ProfileComponent profileSvg={basicman} name={"Dhruv Shah"} onClick={() => handleProfileClick("Dhruv Shah")} />
          <ProfileComponent profileSvg={basicman} name={"Rob Boss"} onClick={() => handleProfileClick("Rob Boss")} />
        </div>
        <div style={{ width: '82%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 3, backgroundColor: colors.backgroundColor, padding: '20px', color: "white"}}>
          <GradientBar value={104} backgroundColor={colors.backgroundColor} />
          <h1 style={{ textAlign: 'left' }}>Your team spent 45 hours edging this week</h1>
          <GradientBar value={200} backgroundColor={colors.backgroundColor} />
          <h1 style={{ textAlign: 'left' }}>Your team was focused for 69 hours this week</h1>
        </div>
          <div style={{ flex: 3, backgroundColor: colors.backgroundColor, padding: '20px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '50%', height: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Pie data={data} options={chartOptions} />
            </div>
            <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <WorkComponent tasks={mockTasks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
