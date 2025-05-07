import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';

@Table({
  tableName: 'employement_verfication_report',
  timestamps: true
})
export class EmploymentVerificationReport extends BaseModel {
  @Column(DataType.INTEGER)
  application_id!: number;

  @Column(DataType.STRING)
  emplpoyer_name!: string;

  @Column(DataType.STRING)
  office_address!: string;

  @Column(DataType.STRING)
  phone!: string;

  @Column(DataType.BOOLEAN)
  co_working_space!: boolean;

  @Column(DataType.STRING)
  mobile_number!: string;

  @Column(DataType.INTEGER)
  type_of_employer!: number;

  @Column(DataType.INTEGER)
  nature!: number;

  @Column(DataType.INTEGER)
  created_by!: number;
} 