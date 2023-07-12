const gameService = require("../Services/game");
const moveService = require('../Service/gameService')

// Create a game

exports.createGame = async (req, res) => {
    try {
      const gameData = req.body.capacity;
      const playerId = req.playerId;
      console.log(gameData)
      const game = await gameService.createGame(gameData, playerId);
      res.status(201).json(game);
    } catch (error) {
      console.error("Error creating game:", error);
      res.status(500).json({ error: "Failed to create game" });
    }
  };
  // Join a game
  exports.joinGame = async (req, res) => {
    try {
      const gameId = req.body.gameId;
      const playerId = req.playerId;
      console.log(gameId);
      const result = await gameService.joinGame(gameId, playerId);
  
      if (result === "Joined the game") {
        res.status(200).json({ message: "Successfully joined the game" });
      } else if (result === "Cannot join. Game is full") {
        res.status(400).json({ error: "Cannot join. Game is full" });
      } else {
        res.status(404).json({ error: "Game not found" });
      }
    } catch (error) {
      console.error("Error joining game:", error);
      res.status(500).json({ error: "Failed to join game" });
    }
  };
  // Get all games
  exports.getAllGames = async (req, res) => {
    try {
      const games = await gameService.findAllGames();
      res.json(games);
    } catch (error) {
      console.error("Error retrieving games:", error);
      res.status(500).json({ error: "Error retrieving games" });
    }
  };

  exports.startGame = async (req, res) => {
    try {
      const gameId = req.body.gameId;
      console.log(gameId);
      const game = await gameService.startGame(gameId);
      res.status(200).json(game);
    } catch (error) {
      console.error("Error starting game:", error);
      res.status(500).json({ error: "Failed to start game" });
    }
  };

  exports.updateGameStatusTo0 = async (req, res) => {
    try {
      const gameId = req.body.gameId;
      const game = await gameService.updateGameStatusTo0(gameId);
      res.status(200).json(game);
    } catch (error) {
      console.error("Error updating game status:", error);
      res.status(500).json({ error: "Failed to update game status" });
    }
  };

  // Check game status controller
exports.checkPlayerStatus = async (req, res) => {
    try {
        const playerId = req.playerId;
        const gameId = req.body.gameId; // Assuming gameId is provided as a route parameter
      const result = await gameService.checkPlayerStatus(gameId,playerId);
  
      if (result === "Player did not play") {
        res.status(200).json({ message: "Player did not play"});
      } else {
        res.status(200).json({message: "Player play"});
      }
    } catch (error) {
      console.error("Error checking game status:", error);
      res.status(500).json({ error: "Failed to check game status" });
    }
  };


  // Take a turn
exports.takeTurn = async (req, res) => {
    try {
      const playerId = req.body.playerId;
      const gameId = req.body.gameId;
      const turnResult = await gameService.Turn(gameId,playerId);
      res.status(200).json(turnResult);
    } catch (error) {
      console.error("Error taking turn:", error);
      res.status(500).json({ error: "Failed to take turn" });
    }
  };

  exports.play= async(req , res )=>{
  const idRoom = req.body.idRoom ;
  const turn  = req.body.turn  ;
  const gameMoveResult   =  await moveService.move(idRoom , turn) ; 
    res.status(200).json(gameMoveResult );
  
}


exports.checkOrderController = async (req, res) => {
  
  const playerId = req.body.playerId;
  const gameId = req.body.gameId;

  try {
    const result = await gameService.checkOrder(playerId, gameId);

    if (result !== 'Not Matches') {
      console.log(result)
      return res.status(200).json({ message: 'Order matches the turn' ,nextturn:result});
    } else {
      return res.status(200).json({ message: 'Order does not match the turn' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


