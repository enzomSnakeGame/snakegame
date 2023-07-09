
var express = require('express');



const Dashboard=(req , res )=>{
    res.send(200 , "dashboard  page ")
}

const start=(req , res )=>{
    const number  = req.body.number ;

        // res.send(200 , "registered successfully :)") ; 
        res.send(200 , number ) ; 

}

const create=(req , res )=>{
    res.send(200 , "create page ")
}

const join=(req , res )=>{
        res.send(200 , "join page ")

}
const play=(req , res )=>{
    //get random number bet 1 & 6
    randomDice = Math.floor(Math.random() * 6 ) + 1;

    // call function move 
    /**
     * get current position of player
     * get snakes and ladder position
     * validate the move(logic of the game) 
     * check winner or not
     * 
     * 
     */
    res.send(200 , "play page ")
}



module.exports={
    Dashboard,
    create , 
    join , 
    start , 
    play
}