const getAllElements = require("../queries/queries");
const getPlayerPositionByRoomAndTurn = require("../queries/queries")
const updatePlayerPosition = require("../queries/queries")

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


  
updatePlayerPosition(newPosition)
.then(()=> {
  console.log("new position updated successfully "+ pdatedRows);
})
.catch(error => {
  console.error("Error:", error);
})

module.exports = {
    getAllElements,
    getPlayerPositionByRoomAndTurn,
    updatePlayerPosition
  };
