import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('applications', {
    applicationId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    applicant_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    },
    bank_branch: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('OPEN', 'ACCEPTED', 'COMPLETED'),
      defaultValue: 'OPEN',
      allowNull: false
    },
    accepted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('applications');
} 