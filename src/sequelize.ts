import { Sequelize } from 'sequelize-typescript';
import { VerifierObservations } from './sequelize/entities/VerifierObservations';
import { ApplicationRegistration } from './sequelize/entities/ApplicationRegistration';
import { CustomerContactReport } from './sequelize/entities/CustomerContactSupport';
import { EmploymentVerificationReport } from './sequelize/entities/VerfirifcationReport';

const connectionString = `mysql://${process.env.DB_USER || 'root'}:${process.env.DB_PASS || ''}@${process.env.DB_HOST || 'localhost'}:3306/${process.env.DB_NAME || 'verisure'}`;

export const sequelize = new Sequelize(connectionString, {
  models: [VerifierObservations, ApplicationRegistration, CustomerContactReport, EmploymentVerificationReport]
}) as any;