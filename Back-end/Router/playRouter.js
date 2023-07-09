var express = require('express');
var playController  = require('../Controller/playController');

const router = express.Router();

router.get('/play',playController.play)


module.exports = router ; 