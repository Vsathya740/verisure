import { Sequelize } from 'sequelize-typescript';
import { VerifierObservations } from './sequelize/models/VerifierObservations';
import { ApplicationRegistration } from './sequelize/models/ApplicationRegistration';
import { CustomerContactReport } from './sequelize/models/CustomerContactReport';
import { EmploymentVerificationReport } from './sequelize/models/VerificationReport';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'IhmOhm@93',
  database: process.env.DB_NAME || 'verisure',
  models: [VerifierObservations, ApplicationRegistration, CustomerContactReport, EmploymentVerificationReport],
  logging: false
});