
const Board = require("../models/Board");

exports.create = async (imagePath) => {
    try {
      const board = await Board.create({ Imagepath: imagePath });
      return board;
    } catch (error) {
      throw new Error('Failed to create board');
    }
  };

  exports.getAllBoards = async () => {
    try {
      const boards = await Board.findAll();
      return boards;
    } catch (error) {
      throw new Error('Failed to retrieve boards');
    }
  };