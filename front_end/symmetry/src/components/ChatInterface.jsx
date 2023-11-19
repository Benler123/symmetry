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
      setTimeout(() => {
      const responseMessage = "Based on the given information, the Ben's day can be summarized as follows:\n\nBen starts the day by participating in a Microsoft Teams call titled 'Front-End Development Sync-Up'. During this call, they discuss various topics related to front-end development.\n\nAfter the call, Ben opens Visual Studio Code and works on a JavaScript file named 'app.js'. They are likely working on a front-end development task or project.\n\nIn the middle of their coding session, Ben takes a break and participates in a coding challenge on HackerRank. This suggests that they are actively practicing and improving their coding skills.\n\nWhile still coding, Ben engages in a chat on Discord, discussing JavaScript frameworks. They are likely seeking or sharing knowledge and ideas related to front-end development technologies.\n\nBen switches gears and opens a Python script named 'data_parser.py' in Visual Studio Code. They might be working on a data parsing or processing task, possibly unrelated to their front-end development work.\n\nBack to their front-end development responsibilities, Ben joins another Microsoft Teams call titled 'Front-End Development Sync-Up'. This indicates that they are involved in regular meetings and discussions to coordinate their work with the rest of the team.\n\nReturning to Visual Studio Code, Ben continues working on the JavaScript file 'app.js'. They might be implementing new features or fixing bugs in a front-end project.\n\nNext, Ben takes part in a virtual meeting for team building activities. This demonstrates that their work environment emphasizes team collaboration and bonding.\n\nDuring a break, Ben browses recent tech startup acquisitions, showing an interest in the technology industry ecosystem.\n\nBen then coordinates with a remote developer on Skype. This suggests that they are working together on a specific project or task.\n\nTaking advantage of a short work break, Ben plays with a pet, highlighting a potentially relaxed and flexible work environment.\n\nBack to their front-end development tasks, Ben focuses on optimizing an e-commerce website's checkout process. They might be improving the user experience or addressing any issues to enhance the customer's journey.\n\nBen's next activity is setting up a Continuous Deployment (CD) pipeline in Jenkins. This indicates they are streamlining and automating the deployment process, which is crucial for efficient software development workflows.\n\nFinally, Ben wraps up their day by catching up on a favorite podcast episode. This might help them relax and unwind after a productive workday.\n\nOverall, Ben's day was varied and dynamic, involving front-end development work, coding challenges, collaboration with colleagues, coordination with a remote developer, and personal activities during breaks."
      setChatHistory(chatHistory => [...chatHistory, { message: responseMessage, isReceived: true }]);
    }, 4000); 
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
