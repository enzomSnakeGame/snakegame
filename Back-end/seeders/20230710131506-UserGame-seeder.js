'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usergames', [
      {
        idroom: 1,
        id: 1,
        playerposition: 1,
        order: 1,
        endDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idroom: 1,
        id: 2,
        playerposition: 2,
        order: 2,
        endDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more Usergame objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usergames', null, {});
  },
};
