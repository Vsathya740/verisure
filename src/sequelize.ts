import { Sequelize } from 'sequelize-typescript';
import { OrganisationMaster } from './sequelize/models/OrganisationMaster';
import { BankMaster } from './sequelize/models/BankMaster';
import { BankBranchMaster } from './sequelize/models/BankBranchMaster';
import { UserMaster } from './sequelize/models/UserMaster';
import { Application } from './sequelize/models/Application';
import { ResidenceVerification } from './sequelize/models/ResidenceVerification';
import { EmployerVerification } from './sequelize/models/EmployerVerification';
import { TelephoneVerification } from './sequelize/models/TelephoneVerification';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'verisure',
  models: [
    OrganisationMaster,
    BankMaster,
    BankBranchMaster,
    UserMaster,
    Application,
    ResidenceVerification,
    EmployerVerification,
    TelephoneVerification
  ],
  logging: false
});