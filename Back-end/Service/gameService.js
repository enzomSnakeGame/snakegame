const gameRepository = require("../Repository/gameRepository");

const move = async (idRoom, turn) => {
  // Get random number between 1 and 6
  const randomDice = Math.floor(Math.random() * 6) + 1;
  // const randomDice = 2;

  console.log("Random", randomDice);

  const size = 100;

  try {
    const elementsArray = await gameRepository.getAllElements();
    // const game = await gameRepository.getRoomTurn();
    console.log("gwa service", idRoom);

    // Get current player position
    const position = await gameRepository.getPlayerPositionByRoomAndTurn(idRoom, turn);
    console.log("el mkan ", position);

    let newPosition = position + randomDice;
    console.log("moveeeee", newPosition);

    if (newPosition === size) {
      // Reached the end, player wins
      console.log('Winner');
      gameRepository.updatePlayerPosition(newPosition, idRoom, turn);
      gameRepository.updateEndDate(idRoom, turn);
    } else if (newPosition > size) {
      // Exceeded the board size, try again
      console.log('Try again');
      newPosition = -1;
    } else {
      // Check if there is a special element at the new position
      const matchingElement = elementsArray.find(element => element.start === newPosition);

      if (matchingElement) {
        // Found a special element, move to the corresponding end position
        newPosition = matchingElement.end;
        console.log("d5lt", newPosition);
      }

      // Update player position and status
      gameRepository.updatePlayerPosition(newPosition, idRoom, turn);
    }
    gameRepository.updatePlayerStatus(idRoom, turn);
    
    return {"playerPosition" : newPosition , 
            "dice" : randomDice};
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = {
  move
};
