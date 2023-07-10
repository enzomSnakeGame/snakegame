'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Elements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idBoard: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Boards',
          key: 'idBoard'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      start: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      end: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Elements');
  }
};
