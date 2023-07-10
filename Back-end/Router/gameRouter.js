var express = require('express');
var gameController = require('../Controller/gameController');

const router = express.Router();

router.post('/games/create', gameController.createGame);
router.get('/games', gameController.getAllGames);
router.post('/games/start', gameController.startGame);
router.post('/games/join', gameController.joinGame);



module.exports = router;