const Sequelize = require("sequelize");

const sequelize = new Sequelize("snake_ladder", "root", "admin@123456", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;