import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('employer_verifications', {
    verificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'applications',
        key: 'id'
      }
    },
    employer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employer_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    employment_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    years_of_service: {
      type: DataTypes.INTEGER,
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
  await queryInterface.dropTable('employer_verifications');
} 