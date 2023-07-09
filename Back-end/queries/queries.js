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

getRoomTurn : async()=>{
    try {
        const game = await sequelize.models.Game.findOne({
          attributes: ['idRoom', 'turn'],
          where: {
            status: 1
          }
        });
        return game;
      } catch (error) {
        console.error('Error retrieving roomid and turn:', error);
        throw error;
      }
  
}
getPlayerPositionByRoomAndTurn: async () => {
    try {
      const game = await getRoomTurn();
      const { roomId, turn } = game;
      const userGame = await sequelize.models.Usergame.findOne({
        attributes: ['playerposition'],
        where: {
          idroom: roomId,
          order: turn
        }
      });
      return userGame.playerposition;
    } catch (error) {
      console.error('Error retrieving player position:', error);
      throw error;
    }
  }



module.exports = getAllElements;
module.exports = getPlayerPositionByRoomAndTurn;
module.exports = getRoomTurn;