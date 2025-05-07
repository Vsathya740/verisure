'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('application_registration', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      applicant_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      applicant_dob: {
        type: Sequelize.DATE,
        allowNull: false
      },
      person_met: {
        type: Sequelize.STRING,
        allowNull: false
      },
      relation_with_person: {
        type: Sequelize.STRING,
        allowNull: false
      },
      earning_members: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      residence_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      permanent_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      years_at_residence: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      address_confirmed_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      residents_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      residence_status: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      approx_rent: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      approx_value_if_owned: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bank_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vehicle_type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      application_final_remarks: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('application_registration');
  }
};
