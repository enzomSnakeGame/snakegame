const { cp } = require("fs");
const Game = require("../models/Game");
const Usergame = require("../models/Usergame");
// Create a game
exports.createGame = async (Capacity, playerId) => {
  try {
    console.log(Capacity)
    const gamedata = {
      capacity: Capacity,
      status: 0,
      turn : 1,
      idBoard : 1
    }
    const game = await Game.create(gamedata);

    // Create an entry in the Usergame table
    const userGameData = {
      idroom: game.idRoom,
      id: playerId, // Use the playerId passed as an argument
      playerposition: 0, // Initial player position is set to zero
      order: 1, // Use the order attribute from gameData
      endDate: null, // endDate is set to null initially
    };

    await Usergame.create(userGameData);

    return { gameid: game.idRoom };
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
     
  
      if (usergame) {
        return {"order":playerCount + 1};
      } else {
        throw new Error('Usergame not found');
      }
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
    
    const filteredGames = await Promise.all(games.map(async game => {
      const { idRoom, capacity } = game;
      const count = await Usergame.count({ where: { idroom: idRoom } });
      if (count < capacity) {
        return game;
      }
      return null;
    }));

    return filteredGames.filter(game => game !== null);
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

    return {capacity: game.capacity, turn: game.turn };
  } catch (error) {
    throw new Error("Failed to start game");
  }
};


exports.Turn = async (idroom, playerId) => {
  try {
    // Get the current game
    console.log(playerId)
    console.log(idroom)
    const userGame = await Usergame.findOne({ where: { idroom: idroom, id: playerId } });
    if (!userGame) {
      throw new Error("Player not found");
    }
 
    const roomId = userGame.idroom;
     
    // Get the current game based on the roomId
    const game = await Game.findOne({ where: { idRoom: idroom } });

    if (!game) {
      throw new Error("Game not found");
    }

    // Get the next player's order
    let nextOrder = userGame.order + 1;
    
    
    console.log(game.capacity)
    if (nextOrder > game.capacity) {
      nextOrder = 1; // Reset to the first player's order
    }
    console.log(nextOrder);
    // Check if the next player's position is 100
    const nextPlayer = await Usergame.findOne({ where: { idroom: idroom, order: nextOrder } });
    console.log(nextPlayer.playerposition);
    if (nextPlayer.playerposition === 100) {
      // If the next player's position is 100, then get the next valid order
      do {
        nextOrder++;
        if (nextOrder > game.capacity) {
          nextOrder = 1; // Reset to the first player's order
        }
        const player = await Usergame.findOne({ where: { idroom: idroom, order: nextOrder } });
        if (!player || player.position !== 100) {
          break;
        }
      } while (true);
    }

    // Update the turn to the next player's order
   
    await game.update({ turn: nextOrder });

    // Return the updated turn
    return nextOrder;
  } catch (error) {
    // Handle errors
    throw error;
  }
};

exports.checkPlayerStatus = async (idroom,playerId) => {
  try {
    // Retrieve the Usergame record based on the playerId
    const userGame = await Usergame.findOne({ where: { idroom: idroom, id: playerId } });

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
    const endTime = startTime + 20000; // 10 seconds interval

    while (Date.now() < endTime) {
      // Retrieve the game from the database
      const updatedGame = await Game.findByPk(gameId);

      // Check if the game status has changed to 1
      if (updatedGame.status === 1) {
        return "player play";
      }

      // Wait for 1 second before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // If the status did not change within 10 seconds
    return "Player did not play";
  } catch (error) {
    console.log(err)
    console.error("Error checking game status:", error);
    throw error;
  }
};


exports.updateGameStatusTo0= async (gameId)=> {
  try {
    const game = await Game.findByPk(gameId);

    // Check if the game is already in status 0
    if (game.status === 0) {
      console.log("already")
      return game;
    }

    game.status = 0; // Update the status to 0
    await game.save(); // Save the changes to the database

    return "updated";
  } catch (error) {
    console.error("Error updating game status:", error);
    throw error;
  }
}

exports.checkOrder = async(playerId,gameId)=>{
  try {
    console.log(playerId);
    console.log(gameId);
    const usergame = await Usergame.findOne({ where: { id: playerId, idroom: gameId } });

    if (!usergame) {
      throw new Error('Usergame not found');
    }

    const game = await Game.findOne({ where: { idRoom: gameId } });

    if (!game) {
      throw new Error('Game not found');
    }
    console.log("ggg")
    console.log(usergame.order);
    console.log(game.turn);
    if (usergame.order === game.turn) {
      console.log('Order matches the turn');
      const turnResult = await this.Turn(gameId,playerId);
       console.log(turnResult)
      return turnResult;
    } else {
      console.log('Order does not match the turn');
    }
    return "Not Matches"
  } catch (error) {
    console.error(error);
  }
}

exports.endDate = async (gameId) => {
  try {
    // Get the current game
    const { Op } = require('sequelize');
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error("Game not found");
    }
   
    const playerCount = await Usergame.count({
      where: {
        idroom: gameId,
        endDate: {
          [Op.not]: null,
        },
      },
    });

    // Check if the player count is equal to the game capacity
    if (playerCount === game.capacity) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
  }
};





