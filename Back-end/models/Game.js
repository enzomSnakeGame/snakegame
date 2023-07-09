const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Game = sequelize.define('Game', {

    idRoom: {
  
      type: Sequelize.INTEGER,
      allowNull:false,
      primaryKey: true
  
    },
  
    capacity:
    {
        type: Sequelize.INTEGER,
        allowNull:false,
    },

     
    Time:{
        type: Sequelize.TIME,
        allowNull:false,
    },
  
    status:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
     
  
    turn:
    {
        type: Sequelize.INTEGER,
        allowNull:false,
    }, 
  
    idBoard:{
        type: Sequelize.INTEGER,
        allowNull:false,
    } 
  
  });
  module.exports = Game;
