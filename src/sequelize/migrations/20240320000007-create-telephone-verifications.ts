import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('telephone_verifications', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'applications',
        key: 'id'
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    person_contacted: {
      type: DataTypes.STRING,
      allowNull: true
    },
    relation_with_applicant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verification_remarks: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('OPEN', 'ACCEPTED', 'COMPLETED'),
      defaultValue: 'OPEN',
      allowNull: true
    },
    accepted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_master',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('telephone_verifications');
} 