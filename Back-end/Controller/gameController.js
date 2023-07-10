
var express = require('express');
const gameService = require('../Service/gameService')


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
    const idRoom = req.body.idRoom ;
    const turn  = req.body.turn  ;
    const result  = gameService.move(idRoom , turn) ; 
    if(result == -1){
        res.send(200 , "winner ")
    }else{

res.send(200 , result )
}
}



module.exports={
    Dashboard,
    create , 
    join , 
    start , 
    play
}