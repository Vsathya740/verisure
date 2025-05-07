import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';

@Table({
  tableName: 'verifier_observations',
  timestamps: true
})
export class VerifierObservations extends BaseModel {
  @Column(DataType.INTEGER)
  application_id!: number;

  @Column(DataType.INTEGER)
  created_by!: number;

  @Column(DataType.INTEGER)
  location!: number;

  @Column(DataType.INTEGER)
  locality_status!: number;

  @Column(DataType.INTEGER)
  accomodation_type!: number;

  @Column(DataType.INTEGER)
  interior_condition!: number;

  @Column(DataType.INTEGER)
  assets_seen!: number;

  @Column(DataType.INTEGER)
  std_of_living!: number;

  @Column(DataType.STRING)
  nearest_landmark!: string;

  @Column(DataType.INTEGER)
  verifier_recommendation!: number;
} 