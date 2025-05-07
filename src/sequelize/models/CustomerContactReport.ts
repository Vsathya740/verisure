import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';

@Table({
  tableName: 'customer_contact_report',
  timestamps: true
})
export class CustomerContactReport extends BaseModel {
  @Column(DataType.INTEGER)
  application_id!: number;

  @Column(DataType.INTEGER)
  created_by!: number;

  @Column(DataType.STRING)
  type_of_verification!: string;

  @Column(DataType.STRING)
  person_spoken_to!: string;
} 