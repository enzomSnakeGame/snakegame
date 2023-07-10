const Game = require("../models/Game");
const Usergame = require("../models/Usergame");
// Create a game
exports.createGame = async (gameData, playerId) => {
  try {
    console.log(gameData);
    const game = await Game.create(gameData);

    // Create an entry in the Usergame table
    const userGameData = {
      idroom: game.idRoom,
      id: playerId, // Use the playerId passed as an argument
      playerposition: 0, // Initial player position is set to zero
      order: 1, // Use the order attribute from gameData
      endDate: null, // endDate is set to null initially
    };

    await Usergame.create(userGameData);

    return game;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create game");
  }
};

// Join a game
exports.joinGame = async (gameId, playerId) => {
  try {
    const game = await Game.findByPk(gameId);
   
    if (!game) {
      throw new Error("Game not found");
    }

    const { capacity } = game; // Get the capacity of the game
    
    // Use Sequelize's aggregate function to count the number of players in the game
    const playerCount = await Usergame.count({
      where: {
        idroom: gameId,
      },
    });
    console.log(capacity)
    if (playerCount < capacity) {
      // If the player count is less than the capacity, allow joining the game
      const usergame = await Usergame.create({
        idroom: gameId,
        id: playerId,
        playerposition: 0, // Set playerposition as 0
        order: playerCount + 1, // Set the order based on the number of existing players
        endDate: null, // Set the endDate to the current time
      });
     
      return "Joined the game";
    } else {
      // If the player count reaches or exceeds the capacity, disallow joining the game
      return "Cannot join. Game is full";
    }
  } catch (error) {
    console.log(error)
    throw new Error("Failed to join game");
  }
};
// Get all games
exports.findAllGames = async () => {
  try {
    const games = await Game.findAll();
    return games;
  } catch (error) {
    throw new Error("Failed to retrieve games");
  }
};

exports.startGame = async (gameId) => {
  try {
    console.log(gameId);
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error("Game not found");
    }

    const playerCount = await Usergame.count({
      where: {
        idroom: gameId,
      },
    });

    // Check if the player count is equal to the game capacity
    if (playerCount !== game.capacity) {
       return "can not Start Game";
    }

    // Perform any necessary logic for starting the game
    // You can customize this based on your specific requirements

    // Once done, update the game status to 2 (indicating it is started)

    return "Start Game";
  } catch (error) {
    throw new Error("Failed to start game");
  }
};


exports.Turn = async (playerId) => {
  try {
    // Get the current game
    const userGame = await Usergame.findOne({ where: { id: playerId } });
    if (!userGame) {
      throw new Error("Player not found");
    }

    const roomId = userGame.idroom;

    // Get the current game based on the roomId
    const game = await Game.findOne({ where: { idRoom: roomId } });
   
    if (!game) {
      throw new Error("Game not found");
    }    
    // Update the turn to the next player's order
    const nextTurn = (game.turn % userGame.order) + 1;
    console.log(nextTurn);
    await game.update({ turn: nextTurn });

    // Return the updated turn
    return { turn: nextTurn };
  } catch (error) {
    // Handle errors
    throw error;
  }
};


exports.checkPlayerStatus = async (playerId) => {
  try {
    // Retrieve the Usergame record based on the playerId
    const userGame = await Usergame.findOne({ where: { id: playerId } });

    if (!userGame) {
      throw new Error("Player not found");
    }

    const gameId = userGame.idroom;

    const game = await Game.findByPk(gameId);

    // Check if the game status is already 1
    if (game.status === 1) {
      return game;
    }

    const startTime = Date.now();
    const endTime = startTime + 10000; // 10 seconds interval

    while (Date.now() < endTime) {
      // Retrieve the game from the database
      const updatedGame = await Game.findByPk(gameId);

      // Check if the game status has changed to 1
      if (updatedGame.status === 1) {
        return updatedGame;
      }

      // Wait for 1 second before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // If the status did not change within 10 seconds
    return "Player did not play";
  } catch (error) {
    console.error("Error checking game status:", error);
    throw error;
  }
};


exports.updateGameStatusTo0= async (gameId)=> {
  try {
    const game = await Game.findByPk(gameId);

    // Check if the game is already in status 0
    if (game.status === 0) {
      return game;
    }

    game.status = 0; // Update the status to 0
    await game.save(); // Save the changes to the database

    return game;
  } catch (error) {
    console.error("Error updating game status:", error);
    throw error;
  }
}




