const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Board = sequelize.define('Board', {

    idBoard: {
  
      type: Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey: true
  
    }
  
  });
  
  module.exports = Board;