import React, { useState, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import agentProfilePic from "../resources/loginGuy.svg"
import bSteeleImage from '../resources/bensteele.svg';
import tKwokImage from '../resources/tylerkwok.svg';
import mattImage from '../resources/matt.svg';
import dhruvImage from '../resources/dhruvshah.svg'
import logo from '../resources/symLogo.svg'

function ChatInterface({ userName }) {
  useEffect(() => {
    // Prevent scrolling when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const [message, setMessage] = useState('');
  // Adding a welcome message to the initial state of chatHistory
  const getUserProfilePic = (userName) => {
    switch (userName) {
      case 'bSteele':
        return bSteeleImage;
      case 'tKwok':
        return tKwokImage;
      case 'matt':
        return mattImage;
      case 'dhruv':
        return dhruvImage;
      default:
        return agentProfilePic; // default image if user is not recognized
    }
  };
  const [chatHistory, setChatHistory] = useState([
    { message: "Hello! I'm here to help you keep track of all your teammates! How can I help? ", isReceived: true }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { message, isReceived: false }]);
      // For demonstration, the response mirrors the sent message
      setChatHistory(chatHistory => [...chatHistory, { message, isReceived: true }]);
      setMessage('');
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const styles = {
    chatInterface: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    chatHistory: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      padding: '10px',
      maxHeight: "50%"
    },
    chatInput: {
      border: '3px solid #FFFFFF',
      padding: '15px',
      backgroundColor: "transparent",
      borderRadius: "20px",
      color:"#FFFFFF",
      fontWeight:"bold",
      outline:"none"
    }
  };

  return (
    <div style={styles.chatInterface}>
      <div style={styles.chatHistory}>
        {chatHistory.map((chat, index) => (
          <ChatBubble
          key={index}
          message={chat.message}
          isReceived={chat.isReceived}
          profilePic={chat.isReceived ? getUserProfilePic(userName) : agentProfilePic}
          />
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        style={styles.chatInput}
      />
    </div>
    
  );
}

export default ChatInterface;
