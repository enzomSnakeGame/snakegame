const Game = require("../models/Game");
const Usergame = require("../models/Usergame");
// Create a game
exports.createGame = async (gameData) => {
  try {
    console.log(gameData);
    const game = await Game.create(gameData);
    return game;
  } catch (error) {
    console.log(error)
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
   
    if (playerCount < capacity) {
      // If the player count is less than the capacity, allow joining the game
      console.log("aa");
      const usergame = await Usergame.create({
        idroom: gameId,
        id: playerId,
        playerposition: 0, // Set playerposition as 0
        order: playerCount + 1, // Set the order based on the number of existing players
        endDate: "12:00:00", // Set the endDate to the current time
      });
     
      return "Joined the game";
    } else {
      // If the player count reaches or exceeds the capacity, disallow joining the game
      return "Cannot join. Game is full";
    }
  } catch (error) {
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

    // Check if the game status is 1 (indicating it is ready to start)
    if (game.status !== 1) {
      throw new Error("Game cannot be started");
    }

    // Perform any necessary logic for starting the game
    // You can customize this based on your specific requirements

    // Once done, save the updated game
    await game.save();

    return "Start Game";
  } catch (error) {
    throw new Error("Failed to start game");
  }
};


exports.move = async (playerId) => {
  try {
    // Get the current game
    
    const userGame = await Usergame.findOne({ where: { id: playerId } });
   
    if (!userGame) {
      
      throw new Error("Player not found");
    }

    const roomId = userGame.idroom;
    
    // Get the current game based on the roomId
    const game = await Game.findOne({ where: { idRoom: roomId } });
    console.log(game);
    if (!game) {
      throw new Error("Game not found");
    }

    // Check if the player is allowed to make a move based on the turn
   
    if (game.turn !== userGame.order) {
      throw new Error("It's not your turn to move.");
    }
    
    const previousPosition = userGame.playerposition;
    
    // Generate a random number from 1 to 6
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // Perform the move logic by adding the dice roll to the current position
    const currentPosition = previousPosition + diceRoll;

    // Update the player's position
    await userGame.update({ playerposition: currentPosition });

    // Update the turn to the next player's order
    const nextTurn = (game.turn % game.order) + 1;
    console.log(nextTurn);
    await game.update({ turn: nextTurn });

    // Return the dice roll, previous position, and current position
    return { diceRoll, previousPosition, currentPosition };
  } catch (error) {
    // Handle errors
    throw error;
  }
};



