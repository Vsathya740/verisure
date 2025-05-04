import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ modelName: 'customer_contact_report' })
export class CustomerContactReport extends Model {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare id: number;
  @Column(DataType.INTEGER) application_id!: number;
  @Column(DataType.INTEGER) created_by!: number;
  @Column type_of_verification!: string;
  @Column person_spoken_to!: string;
}