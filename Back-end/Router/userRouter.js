var express = require('express');
var userController  = require('../Controller/userController');
var userservice = require('../Services/User.js');


const router = express.Router();

router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/getid', userservice.verifyToken);
module.exports = router ;