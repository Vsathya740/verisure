import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ modelName: 'employement_verfication_report' })
export class EmploymentVerificationReport extends Model {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare id: number;
  @Column(DataType.INTEGER) application_id!: number;
  @Column emplpoyer_name!: string;
  @Column office_address!: string;
  @Column phone!: string;
  @Column(DataType.BOOLEAN) co_working_space!: boolean;
  @Column mobile_number!: string;
  @Column(DataType.INTEGER) type_of_employer!: number;
  @Column(DataType.INTEGER) nature!: number;
  @Column(DataType.INTEGER) created_by!: number;
}