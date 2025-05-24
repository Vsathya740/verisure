import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('employer_verifications', {
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
    employer_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employer_coordinates: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    employer_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    employment_status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    years_of_service: {
      type: DataTypes.INTEGER,
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
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('employer_verifications');
} 