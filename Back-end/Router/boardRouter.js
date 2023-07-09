var express = require('express');
var boardController = require('../Controller/boardController');
const router = express.Router();

router.post('/boards/create', boardController.createBoard);
router.get('/boards', boardController.getAllBoards);

module.exports = router;