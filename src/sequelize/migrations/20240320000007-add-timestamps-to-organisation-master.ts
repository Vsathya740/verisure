import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn('organisation_master', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  });

  await queryInterface.addColumn('organisation_master', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn('organisation_master', 'created_at');
  await queryInterface.removeColumn('organisation_master', 'updated_at');
} 