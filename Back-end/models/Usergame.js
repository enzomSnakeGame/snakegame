const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Usergame = sequelize.define('Usergame', {

    idroom: {
  
      type: Sequelize.INTEGER,
       
      primaryKey: true
  
    },
  
    id: {
  
      type: Sequelize.INTEGER,
  
      primaryKey: true
  
    },
  
    playerposition: Sequelize.INTEGER,
  
    order: Sequelize.INTEGER,
  
    endDate: Sequelize.DATE
  
  });

  module.exports = Usergame;