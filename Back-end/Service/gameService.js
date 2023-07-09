const gameRepository = require("../Repository/gameRepository");

  const move = async () => {
    // Get random number between 1 and 6
    const randomDice = Math.floor(Math.random() * 6) + 1;
    const size = 100 ; 
    try {
      const elementsArray = await gameRepository.getAllElements();
      const position = await gameRepository.getPlayerPositionByRoomAndTurn();
      let newPosition = position + randomDice;
      
      if (newPosition === size) {
        console.log('Winner');
        return -1;
      } else if (newPosition > size) {
        console.log('Try again');
        return position;
      } else {
        const matchingElement = elementsArray.find(element => element.start === newPosition);
        if (matchingElement) {
          newPosition = matchingElement.end;
        }
        gameRepository.updatePlayerPosition(newPosition);
        return newPosition;
    }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  module.exports = {
move 
  }