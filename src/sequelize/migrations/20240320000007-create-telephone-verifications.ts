import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('telephone_verifications', {
    verificationId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    applicationId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'applications',
        key: 'applicationId'
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    person_contacted: {
      type: DataTypes.STRING,
      allowNull: false
    },
    relation_with_applicant: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verification_remarks: {
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
  await queryInterface.dropTable('telephone_verifications');
} 