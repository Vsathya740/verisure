import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('branch_master', {
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
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // Add index for org_id
  await queryInterface.addIndex('branch_master', ['org_id'], {
    name: 'branch_master_org_id'
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('branch_master');
} 