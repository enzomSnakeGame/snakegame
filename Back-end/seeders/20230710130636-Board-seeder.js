'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Boards', [
      {
        idBoard: 1,
        Imagepath: 'path_to_image1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idBoard: 2,
        Imagepath: 'path_to_image2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more board objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Boards', null, {});
  },
};
