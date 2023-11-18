import React from 'react';
import ChatInterface from '../components/ChatInterface';

const ChatPage = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{ width: "50%", height: "60%" }}>
        <ChatInterface />
      </div>
    </div>
  );
}

export default ChatPage;
