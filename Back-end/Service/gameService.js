const elementsService = require("../Repository/gameRepository");


async function checkIfNewPositionExists(newPosition) {
    try {
      const elementsArray = await elementsService.getAllElements();
      const newPositionExists = elementsArray.some(element => {
        return element.start === newPosition;
      });
  
      if (newPositionExists) {
        console.log("New position exists");
        // Do something if the new position exists
      } else {
        console.log("New position does not exist");
        // Do something if the new position does not exist
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
  


