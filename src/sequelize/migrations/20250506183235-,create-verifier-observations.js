'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('verifier_observations', {
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
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      location: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      locality_status: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      accomodation_type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      interior_condition: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      assets_seen: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      std_of_living: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nearest_landmark: {
        type: Sequelize.STRING,
        allowNull: false
      },
      verifier_recommendation: {
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
    await queryInterface.dropTable('verifier_observations');
  }
};
