import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { UserMaster } from './UserMaster';

@Table({
  tableName: 'applications',
  timestamps: true,
  underscored: true,
  modelName: 'Application'
})
export class Application extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  applicant_name!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  dob!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  bank_branch!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  phone_number!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  email_id!: string;

  @Column({
    type: DataType.ENUM('OPEN', 'ACCEPTED', 'COMPLETED'),
    defaultValue: 'OPEN',
    allowNull: true
  })
  status!: 'OPEN' | 'ACCEPTED' | 'COMPLETED';

  @ForeignKey(() => UserMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  accepted_by!: number;

  @BelongsTo(() => UserMaster, 'accepted_by')
  acceptedBy!: UserMaster;
} 