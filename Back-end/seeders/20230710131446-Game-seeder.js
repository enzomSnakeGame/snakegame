'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Games', [
      {
        idRoom: 1,
        capacity: 4,
        Time: '12:00 PM',
        status: 1,
        turn: 1,
        idBoard: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idRoom: 2,
        capacity: 2,
        Time: '',
        status: 1,
        turn: 1,
        idBoard: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more game objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
