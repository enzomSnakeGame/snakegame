const Sequelize = require("sequelize");

const sequelize = new Sequelize("snake_ladder", "root", "2001214gogo", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;