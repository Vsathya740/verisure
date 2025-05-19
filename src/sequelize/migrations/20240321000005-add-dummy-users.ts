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
        fullName: 'John Manager',
        role: 'ADMIN',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'sarah.manager',
        email: 'sarah.manager@verisure.com',
        password: hashedPassword,
        fullName: 'Sarah Manager',
        role: 'ADMIN',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agents
      {
        username: 'mike.agent',
        email: 'mike.agent@verisure.com',
        password: hashedPassword,
        fullName: 'Mike Agent',
        role: 'USER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'lisa.agent',
        email: 'lisa.agent@verisure.com',
        password: hashedPassword,
        fullName: 'Lisa Agent',
        role: 'USER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'david.agent',
        email: 'david.agent@verisure.com',
        password: hashedPassword,
        fullName: 'David Agent',
        role: 'USER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'emma.agent',
        email: 'emma.agent@verisure.com',
        password: hashedPassword,
        fullName: 'Emma Agent',
        role: 'USER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'james.agent',
        email: 'james.agent@verisure.com',
        password: hashedPassword,
        fullName: 'James Agent',
        role: 'USER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'sophie.agent',
        email: 'sophie.agent@verisure.com',
        password: hashedPassword,
        fullName: 'Sophie Agent',
        role: 'USER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'tom.agent',
        email: 'tom.agent@verisure.com',
        password: hashedPassword,
        fullName: 'Tom Agent',
        role: 'USER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'anna.agent',
        email: 'anna.agent@verisure.com',
        password: hashedPassword,
        fullName: 'Anna Agent',
        role: 'USER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
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