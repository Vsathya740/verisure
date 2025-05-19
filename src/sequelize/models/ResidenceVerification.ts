import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { UserMaster } from './UserMaster';
import { Application } from './Application';

@Table({
  tableName: 'residence_verifications',
  timestamps: true
})
export class ResidenceVerification extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  verificationId!: number;

  @ForeignKey(() => Application)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  applicationId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  residence_address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  permanent_address!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  years_at_residence!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address_confirmed_by!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  residents_count!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  residence_status!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true
  })
  approx_rent!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true
  })
  approx_value_if_owned!: number;

  @Column({
    type: DataType.ENUM('OPEN', 'ACCEPTED', 'COMPLETED'),
    defaultValue: 'OPEN',
    allowNull: false
  })
  status!: 'OPEN' | 'ACCEPTED' | 'COMPLETED';

  @ForeignKey(() => UserMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  accepted_by!: number;

  @BelongsTo(() => Application, 'applicationId')
  application!: Application;

  @BelongsTo(() => UserMaster, 'accepted_by')
  acceptedBy!: UserMaster;
} 