const BoardService = require('../Services/Board');

// Controller for creating a new board
exports.createBoard = async (req, res) => {
    const { imagePath } = req.body;
    try {
      const board = await BoardService.create(imagePath);
      res.status(201).json(board);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller for retrieving all boards
  exports.getAllBoards = async (req, res) => {
    try {
      const boards = await BoardService.getAllBoards();
      res.status(200).json(boards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  