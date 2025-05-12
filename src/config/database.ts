import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'verisure',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'IhmOhm@93',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

export default sequelize; 