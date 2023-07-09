const { sequelize, Sequelize } = require('../models/Board');
const { sequelize, Sequelize } = require('../models/Elements');
const { sequelize, Sequelize } = require('../models/Game');
const { sequelize, Sequelize } = require('../models/User');
const { sequelize, Sequelize } = require('../models/Usergame');


getAllElements: async()=> {
  try {
    const elements = await Elements.findAll();
    const elementsArray = elements.map(element => ({
      id: element.id,
      idBoard: element.idBoard,
      start: element.start,
      end: element.end
    }));
    return elementsArray;
  } catch (error) {
    console.error("Error fetching elements:", error);
    throw error;
  }
}



module.exports = getAllElements;
