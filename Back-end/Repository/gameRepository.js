const queries = require("../queries/queries");


/*const getAllElements =  queries.getAllElements()
  .then(elementsArray => {
    // console.log(elementsArray);
    return elementsArray ; 
    // Use the elements array as needed
  })
  .catch(error => {
    // Handle error
    console.error("Error:", error);
  });*/

 const getAllElements = () => {
    return queries.getAllElements()
      .then(elementsArray => {
        // Use the elements array as needed
        return elementsArray;
      })
      .catch(error => {
        // Handle error
        console.error("Error:", error);
      });
  };

  
//////////////
 /* const getRoomTurn =  queries.getRoomTurn()
  .then(game =>{
    const{idRoom , turn} = game;
    return {idRoom , turn}
  })
  .catch(error => {
    // Handle error
    console.error("Error:", error);
  });*/
  const getRoomTurn = () => {
    return queries.getRoomTurn()
      .then(game => {
        const { idRoom, turn } = game;
        return { idRoom, turn };
      })
      .catch(error => {
        // Handle error
        console.error("Error:", error);
      });
  };
  
  const getPlayerPositionByRoomAndTurn = (roomId, turn) => {
    return queries.getPlayerPositionByRoomAndTurn(roomId, turn)
      .then(playerPosition => {
        console.log('Player Position:', playerPosition);
        return playerPosition;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

 
//////////

/*const getPlayerPositionByRoomAndTurn = (roomId, turn) => {
 queries.getPlayerPositionByRoomAndTurn(roomId, turn)
  .then(playerPosition => {
    console.log('Player Position:', playerPosition);
    return playerPosition;
    
  })
  .catch(error => {
    console.error('Error:', error);
  });

}*/
 /* const getPlayerPositionByRoomAndTurn = queries.getPlayerPositionByRoomAndTurn()
  .then(playerPosition => {
    console.log('Player Position:', playerPosition);
    return playerPosition;
    
  })
  .catch(error => {
    console.error('Error:', error);
  });*/


   
 const updatePlayerPosition =(newPosition)=>{

  queries.updatePlayerPosition(newPosition)
    .then(()=> {
        console.log("new position updated successfully "+ newPosition);
    })
    .catch(error => {
      console.error("Error:", error);
    })
  }
module.exports = {
    getAllElements,
    getRoomTurn,
    getPlayerPositionByRoomAndTurn,
    updatePlayerPosition
  };

