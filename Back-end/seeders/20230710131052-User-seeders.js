'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'john@example.com',
        tokenPassword: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jane@example.com',
        tokenPassword: '654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more user objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
