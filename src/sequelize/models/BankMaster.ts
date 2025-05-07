import { Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { OrganisationMaster } from './OrganisationMaster';

@Table({
  tableName: 'bank_master',
  timestamps: true
})
export class BankMaster extends BaseModel {
  @Column(DataType.STRING)
  bank_name!: string;

  @Column(DataType.STRING)
  bank_code!: string;

  @ForeignKey(() => OrganisationMaster)
  @Column(DataType.INTEGER)
  org_id!: number;

  @Column(DataType.BOOLEAN)
  status!: boolean;
} 