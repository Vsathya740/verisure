import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('bank_branch_master', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      bank_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'bank_master',
          key: 'id'
        }
      },
      branch_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      branch_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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

    // Add indexes safely
    try {
      await queryInterface.addIndex('bank_branch_master', ['bank_id'], { name: 'bank_branch_master_bank_id' });
    } catch (e) {
      console.log('Index bank_branch_master_bank_id already exists, skipping');
    }
    try {
      await queryInterface.addIndex('bank_branch_master', ['branch_code'], { name: 'bank_branch_master_branch_code' });
    } catch (e) {
      console.log('Index bank_branch_master_branch_code already exists, skipping');
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('bank_branch_master');
  }
}; 