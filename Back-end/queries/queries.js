// const { sequelize, Sequelize } = require('../models/Board');
// const { sequelize, Sequelize } = require('../models/Elements');
// const { sequelize, Sequelize } = require('../models/Game');
// const { sequelize, Sequelize } = require('../models/User');
// const { sequelize, Sequelize } = require('../models/Usergame');

const Board = require('../models/Board');
const Elements = require('../models/Elements');
const Game = require('../models/Game');
const User= require('../models/User');
const Usergame = require('../models/Usergame');


const getAllElements = async()=> {
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

const getRoomTurn = async()=>{
    try {
        const game = await Game.findOne({
          attributes: ['idRoom', 'turn'],
          where: {
            status: 1
          }
        });
        console.log("gwa query",game.idRoom)
        return game;
      } catch (error) {
        console.error('Error retrieving roomid and turn:', error);
        throw error;
      }
  
}

const getPlayerPositionByRoomAndTurn=  async (roomId, turn) => {
  try {
   console.log(roomId)
    const userGame = await Usergame.findOne({
      attributes: ['playerposition'],
      where: {
        idroom : roomId,
        order: turn
      }
    });
    console.log("gwa player query", Usergame.playerposition )
       
    return userGame.playerposition;
  } catch (error) {
    console.error('Error retrieving player position :', error);
    throw error;
  }
}


  const updatePlayerPosition = async (newPosition, idRoom , turn ) => {
    try {
      //const game = await getRoomTurn(); 
      //const { idRoom, turn } = game;
      const userGame = await Usergame.findOne({
        where: {
          idroom: idRoom,
          order: turn
        }
      });
  
      if (userGame) {
        // Update the playerposition
        userGame.playerposition = newPosition;
        await userGame.save();
        return userGame.playerposition;
      } else {
        throw new Error('User game not found');
      }
    } catch (error) {
      console.error('Error retrieving and updating player position:', error);
      throw error;
    }
  }


  const updatePlayerStatus =  async (roomId, turn) => {
    try {  
      const userGame = await Game.findOne({
        where: {
          idRoom: roomId,
          turn: turn
        }
      });
  
      if (userGame) {
        // Update the status of the player
        userGame.status = 1;
        await userGame.save();
        return userGame.playerposition;
      } else {
        throw new Error('User game not found');
      }
    } catch (error) {
      console.error('Error retrieving and updating player status:', error);
      throw error;
    }
  }

  

  
  


module.exports = { 
     getAllElements,
     getPlayerPositionByRoomAndTurn ,
     getRoomTurn, 
     updatePlayerPosition,
     updatePlayerStatus
    }  
