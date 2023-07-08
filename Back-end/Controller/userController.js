
var express = require('express');

const register= (req , res )=>{
    const username = req.body.username ;
    const password = req.body.password 

        // res.send(200 , "registered successfully :)") ; 
        res.send(200 , password) ; 

}


const login=(req , res )=>{
    const username = req.body.username ;
    const password = req.body.password 

    res.send(200 , password) ; 

        // res.send(200 , "login  successfully :)") ; 

}

module.exports={

    register , 
    login
}