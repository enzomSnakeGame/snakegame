const gameRepository = require("../Repository/gameRepository");

  const move = async (idRoom , turn) => {
    // Get random number between 1 and 6
   const randomDice = Math.floor(Math.random() * 6) + 1;
// const randomDice = 2;
    console.log("Random",randomDice);
    const size = 100 ; 
    try {
      const elementsArray = await gameRepository.getAllElements();
      // const game = await gameRepository.getRoomTurn();
      console.log("gwa service" ,idRoom)
      const position = await gameRepository.getPlayerPositionByRoomAndTurn(idRoom , turn);
      
      console.log("el mkan ",position)

      let newPosition = position + randomDice;
  console.log("moveeeee" ,newPosition)
      if (newPosition === size) {
        console.log('Winner');
        gameRepository.updatePlayerPosition(newPosition,idRoom,turn);
        gameRepository.updateEndDate(idRoom,turn);
        gameRepository.updatePlayerStatus(idRoom, turn);
        return -1;
      } else if (newPosition > size) {
        console.log('Try again');
        gameRepository.updatePlayerStatus(idRoom, turn);
        return position;
      } else {
        const matchingElement = elementsArray.find(element => element.start === newPosition);
        if (matchingElement) {
          
          newPosition = matchingElement.end;
          console.log("d5lt",newPosition)
        }
        gameRepository.updatePlayerPosition(newPosition,idRoom,turn);
        gameRepository.updatePlayerStatus(idRoom, turn);
        return newPosition;
    }
    

    } catch (error) {
      console.error('Error:', error);
    }

  };

  module.exports = {
    move 
  }