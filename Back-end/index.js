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
    console.log(result);
}).then(Board=>{
    return User.create({email:"abdada@gmail.com",tokenPassword:"123456"})
    console.log(Board)
}).then(User=>{
    // to reterive data use findAll
    // like User.findAll({where : primarykey})
    console.log(User)
})
.then(User => {
  const newGame = {
      idRoom: 1,
      capacity: 4,
      Time: "12:00:00",
      status: 1,
      turn: 1,
      idBoard: 1
  };

  return Game.create(newGame);
})
.then(createdGame => {
  console.log("Game inserted successfully:", createdGame.toJSON());
}).catch(error => {
  console.error("Error inserting game:", error);
});