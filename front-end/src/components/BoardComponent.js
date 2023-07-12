import React, { useState,useEffect  } from 'react';


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
        top:500,
        color,
        id: i + 1,
        left: -50 - i * increaseLeftBy,
       
      });
    }
  }
  return playerTokens;
};

function App() {
  const [diceNumber, setDiceNumber] = useState(null);
  
  const [playerposition, setPlayerPosition] = useState(null);
  const [numTokens, setnumTokens] = useState(10);
  const [countdown, setCountdown] = useState(10);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerTokens, setPlayerTokens] = useState(generatePlayerTokens(numTokens));
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown]);

  
  const rollDice = async () => {
    try {
     

        const fetch = require('node-fetch');

        const idRoom = 1;
        const turn = currentPlayer;
       
        let flag = turn ;
      
        const url = 'http://localhost:3000/game/games/checkOrder';
        const url1 = 'http://localhost:3000/game/play';
        
        const url3 = 'http://localhost:3000/game/games/status/update';
        const data = {
          playerId: 5,
          gameId: 4
        };

        const data1 = {
            idRoom: 4,
            turn: currentPlayer
          };
        

          const data2 = {
            gameId: 4,
          };  
       await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            // Handle response data
            console.log(data)
            flag = data.nextturn;

            if(data.message !== "Order does not match the turn")
            {
                 fetch(url1, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data1)
                  })
                    .then(response => response.json())
                    .then(data => {
                       console.log(data)
                       console.log(data.playerPosition)
                       setDiceNumber(data.dice);
                       setPlayerPosition(data.playerPosition)
                       movePlayerToken(turn, data.playerPosition);
                       console.log(flag)
                       setCurrentPlayer(flag)
                       fetch(url3, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data2)
                      })
                        .then(response => response.json())
                        .then(data => {
                           console.log(data)
                        }).catch(error => {
                            // Handle error
                          });
                    }).catch(error => {
                        // Handle error
                      });

            }
            else
            {
                console.log("cannot play not your turn");
            }
          })
          .catch(error => {
            // Handle error
          });
      
        


         
          
     
      
      // Move player token based on the API response
     
      
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the API call
    }
  };
  const movePlayerToken = (id, index) => {
    console.log(index);
    console.log(id);
    const currentPlayerTokenIndex = playerTokens.findIndex(token => token.id === id);
    if (currentPlayerTokenIndex !== -1) {
      const updatedPlayerTokens = [...playerTokens];
      let left2 = Math.floor((index-1)/10);
      let top2 = 0;
      if(left2%2 !==0)
      {
        top2 = (index-1)%10;
        top2 = 11-top2-2;
      }
      else
      {
         top2 = (index-1)%10;
      }
      
      left2 = left2+1;
      top2 = top2 +1;
      const newPosition = updatedPlayerTokens[currentPlayerTokenIndex].left + (top2 * 50) ;
      const newpost = updatedPlayerTokens[currentPlayerTokenIndex].top - left2*50;
      updatedPlayerTokens[currentPlayerTokenIndex].left = newPosition;
      updatedPlayerTokens[currentPlayerTokenIndex].top = newpost;

      setPlayerTokens(updatedPlayerTokens);

      const updated2PlayerTokens = playerTokens.map(token => {
        if (token.top === 500) {
          token.left += 50; // Update the left position by 50 units
        }
        return token;
      });
    
      setPlayerTokens(updated2PlayerTokens);
      
    }
  };
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h2 style={{ marginLeft: '240px', marginBottom: '10px' }}>Snakes and Ladders</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        
          <div style={{ textAlign: 'center', marginRight: '20px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Player Turn</p>
            <p style={{ fontSize: '24px', margin: '0' }}>{currentPlayer}</p>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src={require('../snake ladder.png')}
              alt="logo"
              style={{ width: '100%' }}
            />
           
             {playerTokens.map((token, index) => (
            <div
            key={token.id}
              style={{
                position: 'absolute',
                top: `${token.top}px`,
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
          <p style={{ fontWeight: 'bold', marginBottom: '5px',marginLeft:'10px' }}>Countdown</p>
          <p style={{ fontSize: '24px', margin: '0' }}>{countdown}</p>
        </div>
</div>
        </div>
      
      </div>
    </div>
  );
}

export default App;