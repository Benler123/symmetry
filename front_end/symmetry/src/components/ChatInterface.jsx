import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import agentProfilePic from "../resources/loginGuy.svg"
import userProfilePic from "../resources/dhruvshah.svg"

function ChatInterface() {
  const [message, setMessage] = useState('');
  // Adding a welcome message to the initial state of chatHistory
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
          profilePic={chat.isReceived ? agentProfilePic : userProfilePic}
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
