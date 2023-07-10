var express = require('express');
var gameController = require('../Controller/gameController');
var authorization = require('../Services/User');
const router = express.Router();

router.post('/play',gameController.play)
router.post('/games/create',authorization.verifyToken ,gameController.createGame);
router.get('/games',authorization.verifyToken  ,gameController.getAllGames);
router.post('/games/start',authorization.verifyToken  ,gameController.startGame);
router.post('/games/join',authorization.verifyToken  ,gameController.joinGame);
router.post('/games/turn',authorization.verifyToken  ,gameController.takeTurn);
router.get('/games/status', authorization.verifyToken ,gameController.checkPlayerStatus); // Add this line for checking game status
router.post('/games/status/update',authorization.verifyToken ,gameController.updateGameStatusTo0); // Add this line for updating game status to 0

module.exports = router;