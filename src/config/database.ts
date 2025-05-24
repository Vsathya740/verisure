import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

interface Config {
  username: string;
  IhmOhm@93: string;
  database: string;
  host: string;
  dialect: Dialect;
  logging: boolean;
}

interface DbConfig {
  development: Config;
  test: Config;
  production: Config;
}

const config: DbConfig = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'IhmOhm@93',
    database: process.env.DB_NAME || 'verisure',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'IhmOhm@93',
    database: process.env.DB_NAME || 'verisure_test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DB_USER || '',
    IhmOhm@93: process.env.DB_PASS || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    dialect: 'mysql',
    logging: false
  }
};

export default config; 