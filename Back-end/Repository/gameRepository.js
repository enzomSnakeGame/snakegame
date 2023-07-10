const queries = require("../queries/queries");



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


  // const getRoomTurn = () => {
  //   return queries.getRoomTurn()
  //     .then(game => {
  //       const { idRoom, turn } = game;
  //       return { idRoom, turn };
  //     })
  //     .catch(error => {
  //       // Handle error
  //       console.error("Error:", error);
  //     });
  // };
  
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


   
 const updatePlayerPosition =(newPosition, idRoom , turn)=>{

  queries.updatePlayerPosition(newPosition, idRoom, turn)
    .then(()=> {
        console.log("new position updated successfully "+ newPosition);
    })
    .catch(error => {
      console.error("Error:", error);
    })
  }

  const updatePlayerStatus =(roomId, turn)=>{

    queries.updatePlayerPosition(roomId, turn)
      .then(()=> {
          console.log("status updated successfully "+ roomId);
      })
      .catch(error => {
        console.error("Error:", error);
      })
    }


 const updateEndDate = async (idRoom, id) => {
  try {
    await queries.updateEndDate(idRoom, id);
  } catch (error) {
    console.error('Error updating endDate:', error);
    throw error;
  }
};




module.exports = {
    getAllElements,
    // getRoomTurn,
    updateEndDate,
    getPlayerPositionByRoomAndTurn,
    updatePlayerPosition,
    updatePlayerStatus
  };

