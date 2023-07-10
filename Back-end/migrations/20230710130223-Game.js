'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Games', {
      idRoom: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      turn: {
        allowNull: false,
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
    await queryInterface.dropTable('Games');
  }
};
