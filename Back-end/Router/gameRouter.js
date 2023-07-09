var express = require('express');
var gameController  = require('../Controller/gameController');

const router = express.Router();

router.get('/create',gameController.create)
router.get('/join',gameController.join)
router.get('/Dashboard',gameController.Dashboard)
router.get('/play',gameController.play)
router.get('/start',gameController.start)

module.exports = router ; 