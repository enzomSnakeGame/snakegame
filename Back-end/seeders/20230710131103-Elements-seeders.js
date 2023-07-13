'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Elements', [
      {
        idBoard: 1,
        start: 1,
        end: 38,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 4,
        end: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 8,
        end: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 21,
        end: 42,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idBoard: 1,
        start: 28,
        end: 76,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idBoard: 1,
        start: 32,
        end: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 36,
        end: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 48,
        end: 26,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idBoard: 1,
        start: 50,
        end: 67,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idBoard: 1,
        start: 62,
        end: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idBoard: 1,
        start: 71,
        end: 92,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 80,
        end: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 88,
        end: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 95,
        end: 56,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        idBoard: 1,
        start: 97,
        end: 78,
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
