import React from 'react';

function ChatBubble({ message, isReceived }) {
  const styles = {
    chatBubble: {
      margin: '10px',
      padding: '10px',
      borderRadius: '20px',
      maxWidth: '60%',
      wordWrap: 'break-word',
      backgroundColor: isReceived ? '#e5e5ea' : '#007aff',
      color: isReceived ? 'black' : 'white',
      alignSelf: isReceived ? 'flex-start' : 'flex-end',
    }
  };

  return <div style={styles.chatBubble}>{message}</div>;
}

export default ChatBubble;
