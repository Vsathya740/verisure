import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { UserMaster } from './UserMaster';
import { Application } from './Application';

@Table({
  tableName: 'employer_verifications',
  timestamps: true
})
export class EmployerVerification extends BaseModel {
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
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  employer_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  employer_address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  designation!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  department!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  salary!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  employment_status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  years_of_service!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  verification_remarks!: string;

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

  @BelongsTo(() => Application)
  application!: Application;

  @BelongsTo(() => UserMaster, 'accepted_by')
  acceptedBy!: UserMaster;
} 