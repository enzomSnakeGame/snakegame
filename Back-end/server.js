const express = require('express') ;
const app = express() ;

const cors = require('cors') ;
app.use(cors()) ;
var userRouter  = require('./Router/userRouter');
var gameRouter  = require('./Router/gameRouter');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const port = 3000 ;

app.listen(port , ()=>{

    console.log('start listening ---------');
}) ;


const home = '/' ;
app.get(home , (req , res )=>{

    res.send(200 , " backend created successfuly ");
})

app.use('/user' , userRouter) ;
app.use('/game', gameRouter)  ; 