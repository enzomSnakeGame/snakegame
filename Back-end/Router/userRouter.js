var express = require('express');
var userController  = require('../Controller/userController');

const router = express.Router();

router.post('/register',userController.register)
router.post('/login',userController.login)

module.exports = router ; 