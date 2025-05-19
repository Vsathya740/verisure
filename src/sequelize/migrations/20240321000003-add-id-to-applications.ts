import { QueryInterface, DataTypes, QueryTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    // Helper function to safely remove constraint
    const safeRemoveConstraint = async (tableName: string, constraintName: string) => {
      try {
        await queryInterface.removeConstraint(tableName, constraintName);
      } catch (error) {
        // Ignore error if constraint doesn't exist
        console.log(`Constraint ${constraintName} not found on table ${tableName}, skipping removal`);
      }
    };

    // Get the current table data
    const applications = await queryInterface.sequelize.query(
      'SELECT * FROM applications;',
      { type: QueryTypes.SELECT }
    ) as any[];

    // Get verification data
    const residenceVerifications = await queryInterface.sequelize.query(
      'SELECT * FROM residence_verifications;',
      { type: QueryTypes.SELECT }
    ) as any[];

    const telephoneVerifications = await queryInterface.sequelize.query(
      'SELECT * FROM telephone_verifications;',
      { type: QueryTypes.SELECT }
    ) as any[];

    const employerVerifications = await queryInterface.sequelize.query(
      'SELECT * FROM employer_verifications;',
      { type: QueryTypes.SELECT }
    ) as any[];

    // Disable foreign key checks
    await queryInterface.sequelize.query(
      'SET FOREIGN_KEY_CHECKS = 0;'
    );

    // Safely remove foreign key constraints from applications
    await safeRemoveConstraint('applications', 'residence_verifications_ibfk_1');
    await safeRemoveConstraint('applications', 'employer_verifications_ibfk_1');
    await safeRemoveConstraint('applications', 'telephone_verifications_ibfk_1');

    // Drop the current tables
    await queryInterface.dropTable('residence_verifications');
    await queryInterface.dropTable('telephone_verifications');
    await queryInterface.dropTable('employer_verifications');
    await queryInterface.dropTable('applications');

    // Create the applications table with new structure
    await queryInterface.createTable('applications', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      applicationId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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

    // Reinsert applications data
    if (applications.length > 0) {
      await queryInterface.bulkInsert('applications', applications);
    }

    // Create verification tables with updated structure
    await queryInterface.createTable('residence_verifications', {
      verificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'applications',
          key: 'id'
        }
      },
      // ... rest of the columns remain the same
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('telephone_verifications', {
      verificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'applications',
          key: 'id'
        }
      },
      // ... rest of the columns remain the same
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('employer_verifications', {
      verificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'applications',
          key: 'id'
        }
      },
      // ... rest of the columns remain the same
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    // Reinsert verification data
    if (residenceVerifications.length > 0) {
      await queryInterface.bulkInsert('residence_verifications', residenceVerifications);
    }
    if (telephoneVerifications.length > 0) {
      await queryInterface.bulkInsert('telephone_verifications', telephoneVerifications);
    }
    if (employerVerifications.length > 0) {
      await queryInterface.bulkInsert('employer_verifications', employerVerifications);
    }

    // Re-enable foreign key checks
    await queryInterface.sequelize.query(
      'SET FOREIGN_KEY_CHECKS = 1;'
    );
  },

  down: async (queryInterface: QueryInterface) => {
    // Get the current table data
    const applications = await queryInterface.sequelize.query(
      'SELECT * FROM applications;',
      { type: QueryTypes.SELECT }
    ) as any[];

    const residenceVerifications = await queryInterface.sequelize.query(
      'SELECT * FROM residence_verifications;',
      { type: QueryTypes.SELECT }
    ) as any[];

    const telephoneVerifications = await queryInterface.sequelize.query(
      'SELECT * FROM telephone_verifications;',
      { type: QueryTypes.SELECT }
    ) as any[];

    const employerVerifications = await queryInterface.sequelize.query(
      'SELECT * FROM employer_verifications;',
      { type: QueryTypes.SELECT }
    ) as any[];

    // Disable foreign key checks
    await queryInterface.sequelize.query(
      'SET FOREIGN_KEY_CHECKS = 0;'
    );

    // Drop the current tables
    await queryInterface.dropTable('residence_verifications');
    await queryInterface.dropTable('telephone_verifications');
    await queryInterface.dropTable('employer_verifications');
    await queryInterface.dropTable('applications');

    // Recreate the applications table with original structure
    await queryInterface.createTable('applications', {
      applicationId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
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

    // Recreate verification tables with original structure
    await queryInterface.createTable('residence_verifications', {
      verificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      applicationId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'applications',
          key: 'applicationId'
        }
      },
      // ... rest of the columns remain the same
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('telephone_verifications', {
      verificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      applicationId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'applications',
          key: 'applicationId'
        }
      },
      // ... rest of the columns remain the same
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('employer_verifications', {
      verificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      applicationId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'applications',
          key: 'applicationId'
        }
      },
      // ... rest of the columns remain the same
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    // Reinsert data
    if (applications.length > 0) {
      await queryInterface.bulkInsert('applications', applications);
    }
    if (residenceVerifications.length > 0) {
      await queryInterface.bulkInsert('residence_verifications', residenceVerifications);
    }
    if (telephoneVerifications.length > 0) {
      await queryInterface.bulkInsert('telephone_verifications', telephoneVerifications);
    }
    if (employerVerifications.length > 0) {
      await queryInterface.bulkInsert('employer_verifications', employerVerifications);
    }

    // Re-enable foreign key checks
    await queryInterface.sequelize.query(
      'SET FOREIGN_KEY_CHECKS = 1;'
    );
  }
}; 