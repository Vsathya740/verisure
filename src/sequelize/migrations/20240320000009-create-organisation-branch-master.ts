import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('organisation_branch_master', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    org_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organisation_master',
        key: 'id'
      }
    },
    branch_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
      allowNull: false
    }
  });

  // Add index for org_id
  await queryInterface.addIndex('organisation_branch_master', ['org_id'], {
    name: 'organisation_branch_master_org_id'
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('organisation_branch_master');
} 