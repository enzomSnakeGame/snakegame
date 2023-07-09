const elementsService = require("../Repository/gameRepository");




  const move = async () => {
    // Get random number between 1 and 6
    const randomDice = Math.floor(Math.random() * 6) + 1;
    try {
      const elementsArray = await elementsService.getAllElements();
      const position = await elementsService.getPlayerPositionByRoomAndTurn();
      let newPosition = position + randomDice;
      
      if (newPosition === size) {
        console.log('Winner');
      } else if (newPosition > size) {
        console.log('Try again');
      } else {
        const matchingElement = elementsArray.find(element => element.start === newPosition);
        if (matchingElement) {
          newPosition = matchingElement.end;
        }
          // call a function to update 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


