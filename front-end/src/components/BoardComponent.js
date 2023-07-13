import React, { useState,useEffect  } from 'react';
import { useNavigate } from "react-router-dom";

import {NumTokens ,CurrentPlayer} from "./PendingComponent";

 // Replace 'your-button-id' with the actual ID of your button
var timer;
const colors = ['teal', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'magenta', 'lime'];
const generatePlayerTokens = (numTokens) => {
  const increaseLeftBy = 50;
  let playerTokens = [];
  if (parseInt(sessionStorage.getItem("capacity")) > 0) {
    let remainingColors = [...colors]; // Copy the colors array
    for (let i = 0; i < numTokens; i++) {
      const color = remainingColors[i];
      remainingColors.splice(i, 1); // Remove the selected color from the remaining colors
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
const App =({socket})=> {
  
  const [diceNumber, setDiceNumber] = useState(null);
  const [playerposition, setPlayerPosition] = useState(null);
  const [numTokens, setnumTokens] = useState(NumTokens);
  const [countdown, setCountdown] = useState(10);
  const [currentPlayer, setCurrentPlayer] = useState(CurrentPlayer);
  const [playerTokens, setPlayerTokens] = useState(generatePlayerTokens(numTokens));
   useEffect (()=>
   
   {
    
     
    
      // Function to be called when the button is clicked
      var button = document.getElementById("1");
    
      // Function to start the timer when the button is not pressed
      function startTimer() {
        timer = setTimeout(function() {
          rollDice(); // Call rolldice function after 10 seconds
        }, 10000); // 10 seconds = 10,000 milliseconds
      }
    
      // Function to reset the timer
      function resetTimer() {
        clearTimeout(timer);
      }
    
    
        // Event listener for button click
        button.addEventListener('click', function() {
          resetTimer(); // Reset the timer if the button is clicked
          rollDice(); // Call rolldice function when the button is clicked
        });
    
        // Start the timer when the page loads
        startTimer();
     
   },[])
  

  const navigate = useNavigate();
  socket.on('end-game',(data) => {
    let path = `/home`; 
    navigate(path);
    console.log(data);
  })
  
 

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

   
  }, [countdown]);
  const rollDice = async () => {
    
    console.log(sessionStorage.getItem("gameId"),"gwaaa", sessionStorage.getItem("capacity"),sessionStorage.getItem("turn"))
    try {
        const fetch = require('node-fetch');
        const idRoom = parseInt(sessionStorage.getItem("gameId"));
        const turn = currentPlayer;
        let flag = turn ;
        const url = 'http://localhost:3000/game/games/checkOrder';
        const url1 = 'http://localhost:3000/game/play';
        const url3 = 'http://localhost:3000/game/games/status/update';
        //todo part of check each 10 second and socket and to think what to do when player finish the game.
        // player id will be removed also game id will be varible for part of start game
        const data = {
          gameId: parseInt(sessionStorage.getItem("gameId")),
        };
        // game id will be varible for part of start game and turn 
        const data1 = {
            idRoom:  parseInt(sessionStorage.getItem("gameId")),
            turn: currentPlayer
          };
       // game id will be varible for part of start game 
          const data2 = {
            gameId: parseInt(sessionStorage.getItem("gameId")),
          }; 
          console.log("currentplayer");
         console.log(currentPlayer);  
       await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': sessionStorage.getItem('token')
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            // Handle response data
            console.log(data)

            
            
            if(data.message !== "Order does not match the turn")
            {
              flag = data.nextturn;
              console.log(flag);
                 fetch(url1, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'authorization': sessionStorage.getItem('token')

                    },
                    body: JSON.stringify(data1)
                  })
                    .then(response => response.json())
                    .then(data => {
                       console.log(data)
                       console.log(data.playerPosition)
                       setDiceNumber(data.dice);
                       setPlayerPosition(data.playerPosition)
                       movePlayerToken(turn, data.playerPosition,flag);
                       if(data.end === true){

                          socket.emit('end-game',{gameId: parseInt(sessionStorage.getItem("gameId"))})
                          let path = `/home`; 
                          navigate(path);
                       }
                       
                       socket.emit('make-move', { gameId: parseInt(sessionStorage.getItem("gameId")), position: data.playerPosition, dice: data.dice , turn: turn , nextturn: flag});
                       clearTimeout(timer);
                       
                       setCountdown(10);
                       fetch(url3, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'authorization': sessionStorage.getItem('token')
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
  const movePlayerToken = (id, index,flag) => {
    console.log("ffff")
    console.log(id)
    console.log(index)
    //let index2 = 1
    //console.log(index2)
    const currentPlayerTokenIndex = playerTokens.findIndex(token => token.id === id);


    if (currentPlayerTokenIndex !== -1 && index!==-1) {

      const updatedPlayerTokens = [...playerTokens];
      let left2 = Math.floor((index-1)/10);
      let top2 = 0;
      if(left2%2 !==0)
      {
        console.log("here")
        top2 = (index-1)%10
        top2 = 11-top2-2;
      }
      else
      {
         top2 = (index-1)%10;
      }
      console.log(left2)
      console.log(top2)
      let newPosition
      let  newpost
      if(updatedPlayerTokens[currentPlayerTokenIndex].top === 500)
      {
        left2 = left2+1;
        top2 = top2 +1;
        console.log(updatedPlayerTokens[currentPlayerTokenIndex].left)
        console.log(updatedPlayerTokens[currentPlayerTokenIndex].top)
        console.log(left2)
        console.log(top2)
         newPosition = updatedPlayerTokens[currentPlayerTokenIndex].left + (top2 * 50) ;
         newpost = updatedPlayerTokens[currentPlayerTokenIndex].top - left2*50;
        updatedPlayerTokens[currentPlayerTokenIndex].left = newPosition;
        updatedPlayerTokens[currentPlayerTokenIndex].top = newpost;
        console.log(updatedPlayerTokens[currentPlayerTokenIndex].left)
        console.log(updatedPlayerTokens[currentPlayerTokenIndex].top)
        setPlayerTokens(updatedPlayerTokens);
      }
      else
      {
        console.log("hena")
        console.log(left2)
        console.log(top2)
        
        if(top2!==0 && left2===0)
        {
            newPosition = (top2 * 50) ;
            newpost =450;
            updatedPlayerTokens[currentPlayerTokenIndex].left = newPosition;
            updatedPlayerTokens[currentPlayerTokenIndex].top = newpost;
            setPlayerTokens(updatedPlayerTokens);
        }
        else if(top2===0 && left2!==0)
        {
            newpost =450- left2*50;
            newPosition = 0 ;
            updatedPlayerTokens[currentPlayerTokenIndex].left = newPosition;
            updatedPlayerTokens[currentPlayerTokenIndex].top = newpost;
            setPlayerTokens(updatedPlayerTokens);
        }
        else
        {
            newPosition = (top2 * 50) ;
            newpost =  450-left2*50;
            updatedPlayerTokens[currentPlayerTokenIndex].left = newPosition;
            updatedPlayerTokens[currentPlayerTokenIndex].top = newpost;
            setPlayerTokens(updatedPlayerTokens);
        }
        
        console.log(updatedPlayerTokens[currentPlayerTokenIndex].left)
        console.log(updatedPlayerTokens[currentPlayerTokenIndex].top)
        
      }
      

      const updated2PlayerTokens = playerTokens.map(token => {
        if (token.top === 500) {
          token.left += 50; // Update the left position by 50 units
        }
        return token;
      });
    
      setPlayerTokens(updated2PlayerTokens);
      setCurrentPlayer(flag);
      console.log(flag);

      console.log(currentPlayer);
      
    }
  };
  useEffect(() => {
    socket.on("move", (data) => {
      console.log(`I listen to event move and this is data ${data}`);
      setDiceNumber(data.dice);
      setPlayerPosition(data.position)
      movePlayerToken(data.turn, data.position);
      setCurrentPlayer(data.nextturn)
      console.log(currentPlayer);
      setCountdown(10);
      console.log("in socket");
      console.log(data.position);
      console.log(data.nextturn);
      console.log(sessionStorage.getItem("Playerorder"))
      // Function to be called when the button is clicked
      var button = document.getElementById("1");
    
      // Function to start the timer when the button is not pressed
      function startTimer() {
        timer = setTimeout(function() {
          rollDice(); // Call rolldice function after 10 seconds
        }, 10000); // 10 seconds = 10,000 milliseconds
      }
    
      // Function to reset the timer
      function resetTimer() {
        clearTimeout(timer);
      }
    
    
        // Event listener for button click
        button.addEventListener('click', function() {
          resetTimer(); // Reset the timer if the button is clicked
          rollDice(); // Call rolldice function when the button is clicked
        });
    
        // Start the timer when the page loads
        startTimer();
      // if(parseInt(data.nextturn) === parseInt (sessionStorage.getItem("Playerorder")))
      // {
      //   const url4 = 'http://localhost:3000/game/games/status';
      //   fetch(url4, {
      //       method: 'GET',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify(data.gameId)
      //     })
      //       .then(response => response.json())
      //       .then(data => {
      //         if(data.message !== "Player play")
      //         { 
      //             rollDice();
      //             console.log("I can see function rollDice in boardcomponent.js line 59");
      //         }
      //       }).catch(error => {
      //           // Handle error
      //         });
      // }
     
  },[]);
  socket.on('end',(data) => {
    console.log(`I listen to event end and this is data ${data}`);
    if(data === "change page"){
      let path = `/home`; 
      navigate(path);
    }
  })
  },[socket]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor:'white' }}>
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
    id="1"
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