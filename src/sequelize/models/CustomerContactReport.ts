import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { UserMaster } from './UserMaster';
import { Application } from './Application';

@Table({
  tableName: 'customer_contact_reports',
  timestamps: true
})
export class CustomerContactReport extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @ForeignKey(() => Application)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'application_id'
  })
  applicationId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  contact_date!: Date;

  @Column({
    type: DataType.ENUM('PHONE', 'EMAIL', 'IN_PERSON'),
    allowNull: false
  })
  contact_type!: 'PHONE' | 'EMAIL' | 'IN_PERSON';

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  contact_details!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  outcome!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  next_follow_up_date!: Date;

  @Column({
    type: DataType.ENUM('OPEN', 'IN_PROGRESS', 'COMPLETED'),
    defaultValue: 'OPEN',
    allowNull: false
  })
  status!: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';

  @ForeignKey(() => UserMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'created_by'
  })
  createdBy!: number;

  @BelongsTo(() => Application)
  application!: Application;

  @BelongsTo(() => UserMaster, 'created_by')
  creator!: UserMaster;
} 