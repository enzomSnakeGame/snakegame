var express = require('express');
var gameController = require('../Controller/gameController');

const router = express.Router();

router.post('/games/create', gameController.createGame);
router.get('/games', gameController.getAllGames);
router.post('/games/start', gameController.startGame);
router.post('/games/join', gameController.joinGame);
router.post('/games/turn', gameController.takeTurn);
router.get('/games/status', gameController.checkPlayerStatus); // Add this line for checking game status
router.post('/games/status/update', gameController.updateGameStatusTo0); // Add this line for updating game status to 0

module.exports = router;