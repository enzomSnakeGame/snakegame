var express = require ('express');

const play =(req,res)=>{
    /**sed new pos and random no. */


   randomDice = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

    res.send(200 , "play");
}


module.exports={
    play
}