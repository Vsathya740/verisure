import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';

export = {
  up: async (queryInterface: QueryInterface) => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = [
      // Managers
      {
        username: 'john.manager',
        email: 'john.manager@verisure.com',
        password: hashedPassword,
        full_name: 'John Manager',
        role: 'ADMIN',
        is_active: true
      },
      {
        username: 'sarah.manager',
        email: 'sarah.manager@verisure.com',
        password: hashedPassword,
        full_name: 'Sarah Manager',
        role: 'ADMIN',
        is_active: true
      },
      // Agents
      {
        username: 'mike.agent',
        email: 'mike.agent@verisure.com',
        password: hashedPassword,
        full_name: 'Mike Agent',
        role: 'USER',
        is_active: true
      },
      {
        username: 'lisa.agent',
        email: 'lisa.agent@verisure.com',
        password: hashedPassword,
        full_name: 'Lisa Agent',
        role: 'USER',
        is_active: true
      },
      {
        username: 'david.agent',
        email: 'david.agent@verisure.com',
        password: hashedPassword,
        full_name: 'David Agent',
        role: 'USER',
        is_active: true
      },
      {
        username: 'emma.agent',
        email: 'emma.agent@verisure.com',
        password: hashedPassword,
        full_name: 'Emma Agent',
        role: 'USER',
        is_active: true
      },
      {
        username: 'james.agent',
        email: 'james.agent@verisure.com',
        password: hashedPassword,
        full_name: 'James Agent',
        role: 'USER',
        is_active: true
      },
      {
        username: 'sophie.agent',
        email: 'sophie.agent@verisure.com',
        password: hashedPassword,
        full_name: 'Sophie Agent',
        role: 'USER',
        is_active: true
      },
      {
        username: 'tom.agent',
        email: 'tom.agent@verisure.com',
        password: hashedPassword,
        full_name: 'Tom Agent',
        role: 'USER',
        is_active: true
      },
      {
        username: 'anna.agent',
        email: 'anna.agent@verisure.com',
        password: hashedPassword,
        full_name: 'Anna Agent',
        role: 'USER',
        is_active: true
      }
    ];

    await queryInterface.bulkInsert('user_master', users);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('user_master', {
      email: [
        'john.manager@verisure.com',
        'sarah.manager@verisure.com',
        'mike.agent@verisure.com',
        'lisa.agent@verisure.com',
        'david.agent@verisure.com',
        'emma.agent@verisure.com',
        'james.agent@verisure.com',
        'sophie.agent@verisure.com',
        'tom.agent@verisure.com',
        'anna.agent@verisure.com'
      ]
    });
  }
}; 