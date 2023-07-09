const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Elements = sequelize.define('Elements', {

    idBoard: {
  
      type: Sequelize.INTEGER,
  
      allowNull: false
  
    },
  
   start: {
  
      type: Sequelize.GEOMETRY('POINT'),
  
      allowNull: false
  
    },
  
    end: {
  
      type: Sequelize.GEOMETRY('POINT'),
  
      allowNull: false
  
    }
  
  });
  module.exports = Elements;
