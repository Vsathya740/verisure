import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';

@Table({
  tableName: 'organisation_master'
})
export class OrganisationMaster extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  code!: string;
} 