import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    const tableInfo = await queryInterface.describeTable('user_master');
    if (!tableInfo.role) {
      await queryInterface.addColumn('user_master', 'role', {
        type: DataTypes.ENUM('MANAGER', 'AGENT'),
        defaultValue: 'AGENT',
        allowNull: false
      });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('user_master', 'role');
  }
}; 