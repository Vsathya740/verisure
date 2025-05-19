import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';

export = {
  up: async (queryInterface: QueryInterface) => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = [
      // Managers
      {
        name: 'John Manager',
        email: 'john.manager@verisure.com',
        password: hashedPassword,
        role: 'MANAGER',
        date_of_birth: '1980-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sarah Manager',
        email: 'sarah.manager@verisure.com',
        password: hashedPassword,
        role: 'MANAGER',
        date_of_birth: '1982-02-02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agents
      {
        name: 'Mike Agent',
        email: 'mike.agent@verisure.com',
        password: hashedPassword,
        role: 'AGENT',
        date_of_birth: '1990-03-03',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lisa Agent',
        email: 'lisa.agent@verisure.com',
        password: hashedPassword,
        role: 'AGENT',
        date_of_birth: '1991-04-04',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'David Agent',
        email: 'david.agent@verisure.com',
        password: hashedPassword,
        role: 'AGENT',
        date_of_birth: '1992-05-05',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emma Agent',
        email: 'emma.agent@verisure.com',
        password: hashedPassword,
        role: 'AGENT',
        date_of_birth: '1993-06-06',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'James Agent',
        email: 'james.agent@verisure.com',
        password: hashedPassword,
        role: 'AGENT',
        date_of_birth: '1994-07-07',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sophie Agent',
        email: 'sophie.agent@verisure.com',
        password: hashedPassword,
        role: 'AGENT',
        date_of_birth: '1995-08-08',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tom Agent',
        email: 'tom.agent@verisure.com',
        password: hashedPassword,
        role: 'AGENT',
        date_of_birth: '1996-09-09',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Anna Agent',
        email: 'anna.agent@verisure.com',
        password: hashedPassword,
        role: 'AGENT',
        date_of_birth: '1997-10-10',
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