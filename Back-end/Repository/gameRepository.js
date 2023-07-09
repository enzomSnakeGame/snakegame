const queries = require("../queries/queries");
// const getPlayerPositionByRoomAndTurn = require("../queries/queries")
// const updatePlayerPosition = require("../queries/queries")

const getAllElements =  queries.getAllElements()
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

  const getPlayerPositionByRoomAndTurn = queries.getPlayerPositionByRoomAndTurn()
  .then(playerPosition => {
    console.log('Player Position:', playerPosition);
    return playerPosition;
    
  })
  .catch(error => {
    console.error('Error:', error);
  });


  
 const updatePlayerPosition = queries.updatePlayerPosition(newPosition)
    .then(()=> {
        console.log("new position updated successfully "+ newPosition);
    })
    .catch(error => {
      console.error("Error:", error);
    })

module.exports = {
    getAllElements,
    getPlayerPositionByRoomAndTurn,
    updatePlayerPosition
  };
