import { QueryInterface } from 'sequelize';

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

    // Safely remove the foreign key constraint from residence_verifications
    await safeRemoveConstraint('residence_verifications', 'residence_verifications_ibfk_1');

    // Update foreign key references in applications for user_master
    await safeRemoveConstraint('applications', 'applications_accepted_by_fkey');
    await queryInterface.addConstraint('applications', {
      fields: ['accepted_by'],
      type: 'foreign key',
      name: 'applications_accepted_by_fkey',
      references: {
        table: 'user_master',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface: QueryInterface) => {
    // Helper function to safely remove constraint
    const safeRemoveConstraint = async (tableName: string, constraintName: string) => {
      try {
        await queryInterface.removeConstraint(tableName, constraintName);
      } catch (error) {
        // Ignore error if constraint doesn't exist
        console.log(`Constraint ${constraintName} not found on table ${tableName}, skipping removal`);
      }
    };

    // Remove the new constraint
    await safeRemoveConstraint('applications', 'applications_accepted_by_fkey');
    await safeRemoveConstraint('residence_verifications', 'residence_verifications_ibfk_1');
  }
}; 