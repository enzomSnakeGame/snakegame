const Sequelize = require("sequelize");


const sequelize = new Sequelize("snake_ladder", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;