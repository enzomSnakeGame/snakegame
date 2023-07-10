'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usergames', {
      idroom: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerposition: {
        type: Sequelize.INTEGER
      },
      order: {
        type: Sequelize.INTEGER
      },
      endDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usergames');
  }
};
