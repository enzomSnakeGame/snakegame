'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Elements', [
      {
        idBoard: 1,
        start: 1,
        end: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 12,
        end: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 15,
        end: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 20,
        end: 95,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idBoard: 2,
        start: 5,
        end: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more element objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Elements', null, {});
  },
};
