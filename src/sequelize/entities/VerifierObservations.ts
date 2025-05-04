import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ modelName: 'verifier_observations' })
export class VerifierObservations extends Model {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) declare id: number;
  @Column(DataType.INTEGER) application_id!: number;
  @Column(DataType.INTEGER) created_by!: number;
  @Column(DataType.INTEGER) location!: number;
  @Column(DataType.INTEGER) locality_status!: number;
  @Column(DataType.INTEGER) accomodation_type!: number;
  @Column(DataType.INTEGER) interior_condition!: number;
  @Column(DataType.INTEGER) assets_seen!: number;
  @Column(DataType.INTEGER) std_of_living!: number;
  @Column nearest_landmark!: string;
  @Column(DataType.INTEGER) verifier_recommendation!: number;
}
