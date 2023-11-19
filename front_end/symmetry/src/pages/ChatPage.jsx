import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for version 6
import ChatInterface from '../components/ChatInterface';
import Footer from '../components/footer';
import LandingFooter from '../components/LandingFooter';


const ChatPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '121vh',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        cursor: 'pointer'
      }}
      onClick={() => navigate('/manager')} // Navigate to '/manager' when clicked
      >
        <span style={{ fontSize: '24px' }}>&#x2190;</span> {/* Unicode Left Arrow */}
        <span style={{ marginTop: '3px', marginLeft: '5px', fontSize: '16px' }}>Back to your team</span> {/* Small text label */}
      </div>
      <div style={{ width: "50%", height: "60%" }}>
        <ChatInterface/>
      </div>
      <LandingFooter/>
    </div>
  );
}

export default ChatPage;
