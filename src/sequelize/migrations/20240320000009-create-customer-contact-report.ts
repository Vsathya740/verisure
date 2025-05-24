import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('customer_contact_reports', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      application_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'applications',
          key: 'id'
        }
      },
      contact_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      contact_type: {
        type: DataTypes.ENUM('PHONE', 'EMAIL', 'IN_PERSON'),
        allowNull: false
      },
      contact_details: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      outcome: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      next_follow_up_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'COMPLETED'),
        defaultValue: 'OPEN',
        allowNull: false
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user_master',
          key: 'id'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('customer_contact_reports');
  }
}; 