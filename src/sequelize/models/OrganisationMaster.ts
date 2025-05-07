import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';

@Table({
  tableName: 'organisation_master',
  timestamps: true
})
export class OrganisationMaster extends BaseModel {
  @Column(DataType.STRING)
  organisation_name!: string;

  @Column(DataType.STRING)
  organisation_code!: string;

  @Column(DataType.BOOLEAN)
  status!: boolean;
} 