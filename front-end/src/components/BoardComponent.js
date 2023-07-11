import React, { useState, useEffect } from 'react';

const Container = ({ children }) => {
  return (
    <div style={{ width: '100%' }}>
      {children}
    </div>
  );
};

const colors = ['teal', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'magenta', 'lime'];

const generatePlayerTokens = (numTokens) => {
  const increaseLeftBy = 50;
  let playerTokens = [];
  if (numTokens > 0) {
    let remainingColors = [...colors]; // Copy the colors array
    for (let i = 0; i < numTokens; i++) {
      const randomIndex = Math.floor(Math.random() * remainingColors.length);
      const color = remainingColors[randomIndex];
      remainingColors.splice(randomIndex, 1); // Remove the selected color from the remaining colors
      playerTokens.push({
        color,
        left: -50 - i * increaseLeftBy,
      });
    }
  }
  return playerTokens;
};

function App() {
  const [diceNumber, setDiceNumber] = useState(null);
  let numTokens = 10;
  const [playerTokens] = useState(generatePlayerTokens(numTokens));
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(randomNumber);
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h2 style={{ marginLeft: '240px', marginBottom: '10px' }}>Snakes and Ladders</h2>
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src={require('../snake ladder.png')}
              alt="logo"
              style={{ width: '100%' }}
            />
            {playerTokens.map((token, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: '500px',
                  left: `${token.left}px`,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: token.color,
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <button
              style={{ margin: '20px', backgroundColor: 'lightblue', width: '100px', height: '40px', borderRadius: '20px', fontWeight: 'bold', fontSize: '15px' }}
              onClick={rollDice}
            >
              Roll Dice
            </button>
            {diceNumber && (
              <p style={{ fontSize: '24px', margin: '0' }}>{diceNumber}</p>
            )}
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px', marginLeft: '10px' }}>Countdown</p>
              <p style={{ fontSize: '24px', margin: '0' }}>{countdown}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}


export default App;
