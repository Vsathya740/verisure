'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employement_verfication_report', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      application_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      emplpoyer_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      office_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      co_working_space: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      mobile_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type_of_employer: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nature: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employement_verfication_report');
  }
};
