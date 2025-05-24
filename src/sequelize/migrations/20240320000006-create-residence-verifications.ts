import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('residence_verifications', {
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
    residence_coordinates: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    residence_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    permanent_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    years_at_residence: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address_confirmed_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    residents_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    residence_status: {
      type: DataTypes.STRING,
      allowNull: true
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
  await queryInterface.dropTable('residence_verifications');
} 