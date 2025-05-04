import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ modelName: 'application_registration' })
export class ApplicationRegistration extends Model {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare id: number;
  @Column(DataType.STRING) applicant_name!: string;
  @Column(DataType.DATE) applicant_dob!: Date;
  @Column(DataType.STRING) person_met!: string;
  @Column(DataType.STRING) relation_with_person!: string;
  @Column(DataType.INTEGER) earning_members!: number;
  @Column(DataType.STRING) residence_address!: string;
  @Column(DataType.STRING) permanent_address!: string;
  @Column(DataType.INTEGER) years_at_residence!: number;
  @Column(DataType.INTEGER) address_confirmed_by!: number;
  @Column(DataType.INTEGER) residents_count!: number;
  @Column(DataType.STRING) phone!: string;
  @Column(DataType.INTEGER) residence_status!: number;
  @Column(DataType.INTEGER) approx_rent!: number;
  @Column(DataType.BIGINT) approx_value_if_owned!: number;
  @Column(DataType.STRING) designation!: string;
  @Column(DataType.INTEGER) bank_id!: number;
  @Column(DataType.INTEGER) vehicle_type!: number;
  @Column(DataType.INTEGER) status_id!: number;
  @Column(DataType.STRING) application_final_remarks!: string;
}