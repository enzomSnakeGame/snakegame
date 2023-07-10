const Sequelize = require("sequelize");

const sequelize = new Sequelize("snake_ladder", "root", "csed2024", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;