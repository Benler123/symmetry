import React, { useState } from 'react';
import ChatBubble from './ChatBubble';

function ChatInterface() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

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
      border: 'none',
      padding: '15px',
      borderTop: '1px solid #ccc'
    }
  };

  return (
    <div style={styles.chatInterface}>
      <div style={styles.chatHistory}>
        {chatHistory.map((chat, index) => (
          <ChatBubble key={index} message={chat.message} isReceived={chat.isReceived} />
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
