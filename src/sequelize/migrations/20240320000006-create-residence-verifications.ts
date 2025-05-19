import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('residence_verifications', {
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
    residence_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permanent_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    years_at_residence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address_confirmed_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    residents_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    residence_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    approx_rent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    approx_value_if_owned: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
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
  await queryInterface.dropTable('residence_verifications');
} 