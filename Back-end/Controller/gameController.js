const gameService = require("../Services/game");

// Create a game
exports.createGame = async (req, res) => {
    try {
        console.log(req.body);
      const game = await gameService.createGame(req.body);
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
      const playerId = req.body.playerId;
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

  exports.move = async (req, res) => {
    try {
      const playerId = req.body.playerId;
      const updatedGame = await gameService.move(playerId);
  
      res.status(200).json(updatedGame);
    } catch (error) {
      console.error("Error performing move:", error);
      res.status(500).json({ error: "Failed to perform move" });
    }
  };