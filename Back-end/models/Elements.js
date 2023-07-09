const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Elements = sequelize.define('Elements', {

    idBoard: {
  
      type: Sequelize.INTEGER,
  
      allowNull: false
  
    },
  
   start: {
  
      type: Sequelize.INTEGER,
  
      allowNull: false
  
    },
  
    end: {
  
      type: Sequelize.INTEGER,
  
      allowNull: false
  
    }
  
  });
  module.exports = Elements;
