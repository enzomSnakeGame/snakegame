const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define('User', {

    id: {
  
      type: Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
  
      primaryKey: true
  
    },
  
    email:{ 
       type: Sequelize.STRING(45),
       allowNull:false,
    },
    tokenPassword:
    {
        type: Sequelize.STRING(45),
        allowNull:false,  
    } 
  
  });

  
  module.exports = User;