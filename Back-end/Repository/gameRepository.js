const getAllElements = require("../queries/queries");
const getRoomTurn = require("../queries/queries")

getAllElements()
  .then(elementsArray => {
    // console.log(elementsArray);
    return elementsArray ; 
    // Use the elements array as needed
  })
  .catch(error => {
    // Handle error
    console.error("Error:", error);
  });


 /* getRoomTurn()
  .then(game =>{
    const{idRoom , turn} = game;
    return {idRoom , turn}
  })
  .catch(error => {
    // Handle error
    console.error("Error:", error);
  });*/

  getPlayerPositionByRoomAndTurn()
  .then(playerPosition => {
    console.log('Player Position:', playerPosition);
    return playerPosition;
    
  })
  .catch(error => {
    console.error('Error:', error);
  });