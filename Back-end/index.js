const sequelize = require("./util/database");
const Board = require("./models/Board");
const Elements = require("./models/Elements");
const Game = require("./models/Game");
const User = require("./models/User");
const Usergame = require("./models/Usergame");

Board.hasMany(Elements, {

    foreignKey: 'idBoard'
  
  });
  
  Elements.belongsTo(Board, {
  
    foreignKey: 'idBoard'
  
  });
  
   
  
  Board.hasMany(Game, {
  
    foreignKey: 'idBoard'
  
  });
  
  Game.belongsTo(Board, {
  
    foreignKey: 'idBoard'
  
  });
  
   
  
  User.hasMany(Usergame, {
  
    foreignKey: 'id'
  
  });
  
  Usergame.belongsTo(User, {
  
    foreignKey: 'id'
  
  });
  
   
  
  Game.hasMany(Usergame, {
  
    foreignKey: 'idroom'
  
  });
  
  Usergame.belongsTo(Game, {
  
    foreignKey: 'idroom'
  
  });
  
sequelize.sync({force:true}).then(result =>{
    return Board.create({idBoard:"1",Imagepath:"mfesh"})
}).then(Board=>{
    return User.create({email:"abdada@gmail.com",tokenPassword:"123456"})
}).then(Board=>{
  return User.create({email:"abdad12a@gmail.com",tokenPassword:"12443456"})
}).catch(error => {
  console.error("Error inserting game:", error);
});