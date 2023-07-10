'use strict';

require('./models/Board')
require('./models/User')
require('./models/Game')
require('./models/Usergame')
require('./models/Elements')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Boards', {
      idBoard: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Imagepath: {
        allowNull: false,
        type: Sequelize.STRING(100)
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

    await queryInterface.createTable('Games', {
      idRoom: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Time: {
        allowNull: false,
        type: Sequelize.TIME
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

    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      tokenPassword: {
        allowNull: false,
        type: Sequelize.STRING(45)
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
      "order": {
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

    // Add foreign key constraints here using queryInterface.addConstraint()

    // Foreign key between Board and Elements
    await queryInterface.addConstraint('Elements', {
      fields: ['idBoard'],
      type: 'foreign key',
      name: 'fk_Elements_Board',
      references: {
        table: 'Boards',
        field: 'idBoard'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Foreign key between Board and Game
    await queryInterface.addConstraint('Games', {
      fields: ['idBoard'],
      type: 'foreign key',
      name: 'fk_Games_Board',
      references: {
        table: 'Boards',
        field: 'idBoard'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Foreign key between User and Usergame
    await queryInterface.addConstraint('Usergames', {
      fields: ['id'],
      type: 'foreign key',
      name: 'fk_Usergames_User',
      references: {
        table: 'Users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Foreign key between Game and Usergame
    await queryInterface.addConstraint('Usergames', {
      fields: ['idroom'],
      type: 'foreign key',
      name: 'fk_Usergames_Game',
      references: {
        table: 'Games',
        field: 'idRoom'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraints here using queryInterface.removeConstraint()

    await queryInterface.removeConstraint('Usergames', 'fk_Usergames_Game');
    await queryInterface.removeConstraint('Usergames', 'fk_Usergames_User');
    await queryInterface.removeConstraint('Games', 'fk_Games_Board');
    await queryInterface.removeConstraint('Elements', 'fk_Elements_Board');

    // Drop tables
    await queryInterface.dropTable('Usergames');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Games');
    await queryInterface.dropTable('Elements');
    await queryInterface.dropTable('Boards');
  }
};
