"use strict";

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      username: {
        type: Sequelize.string,
        allowNull: false,
      },

      role: {
        type: Sequelize.string,
        allowNull: false,
      },

      email: {
        type: Sequelize.string,
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.string,
        allowNull: true,
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')
  },
};
