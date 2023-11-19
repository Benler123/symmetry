import React from 'react';

function ChatBubble({ message, isReceived, profilePic }) {
  const styles = {
    bubbleContainer: {
      display: 'flex',
      justifyContent: isReceived ? 'flex-start' : 'flex-end',
      alignItems: 'center'
    },
    bubble: {
      borderRadius: '20px',
      padding: '10px',
      margin: '5px',
      display: 'flex',
      alignItems: 'center',
      wordWrap: 'break-word',
      maxWidth: '65%',
      backgroundColor: isReceived ? '#e5e5ea' : '#007aff',
      color: isReceived ? 'black' : 'white',
      order: isReceived ? 2 : 1, // Order 2 when sent by user
    },
    profilePic: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      margin: '0 10px',
      order: isReceived ? 1 : 2, // Order 1 when sent by user
    },
    text: {
      padding: 0,
      margin: 0,
      maxWidth: 'calc(100% - 40px)', // Account for padding and profile pic width
    }
  };

  return (
    <div style={styles.bubbleContainer}>
      <img src={profilePic} alt="Profile" style={styles.profilePic} />
      <div style={styles.bubble}>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ChatBubble;
