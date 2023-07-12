const express = require('express') ;
const app = express() ;


const cors = require('cors') ;
app.use(cors()) ;
var userRouter  = require('./Router/userRouter');
var gameRouter  = require('./Router/gameRouter');

const io = require('socket.io')(3001,{
    cors: {
        origin: ['http://localhost:3002'], // url of the react (Frontend) app
        methods: ['GET', 'POST'],
    }});

// handle socket.io connection
io.on('connection', (socket) => {
    console.log(`a user connected  ${socket.id}`);
    // in client , it call endpoint for create game and server return gameId
    // then client send to event create-game gameid to join it
    socket.on('create-game', (data) => {   // data will send here is gameId
        console.log(data);
        socket.join(data);
    });
    // client send to endpoints to join game by gameId , if server agree to join it
    // it send through event join-game to 
    socket.on('join-game', (data) => { // data will send here is gameId
        console.log(data);
        socket.join(data);  // join room
        // emit to all clients in room with new capacity of game
        const capacity = io.sockets.adapter.rooms.get(data).size;
        console.log(capacity);
        socket.to(data).emit('join-game', capacity); // send to all clients in room
    });
    // client send to endpoints to start game by gameId , if server agree to start it
    // it send through event start-game to make other user change the page
    socket.on('start-game', (data) => { // data will send here is gameId
        console.log(data);
        socket.broadcast.to(data).emit('start-game',"change page"); // send to all clients in room except sender
    });
    // client send to endpoints to make move by gameId , if server agree to make it
    // it send through event make-move to make other user make move
    socket.on('make-move', (data) => { // data will send here is new position of player and identifier for this player "I don't what it's till now" and gameId
        console.log(data);
        socket.broadcast.to(data.gameId).emit('make-move',{ position: data.position, dice: data.dice , turn: data.turn , nextturn: data.nextturn}); // send to all clients in room except sender
    });
    // c
    socket.on('end-game',(data)=>{
        console.log(data)
        socket.to(data.gameId).emit('end-game',"change page")
    })
});


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