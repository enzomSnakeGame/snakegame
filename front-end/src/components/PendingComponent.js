import React from 'react';

const PendingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #000000, #1a1a1a)', // Background gradient
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Waiting for Players</h1>
      <p style={{ fontSize: '24px', marginBottom: '40px' }}>
        Please wait while other players join the game.
      </p>
      <div style={{ fontSize: '18px' }}>
        <p>Player 1</p>
        <p>Player 2</p>
        <p>Player 3</p>
        {/* Add more player names here */}
      </div>
    </div>
  );
};

export default PendingPage;
