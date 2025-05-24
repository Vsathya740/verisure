import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { UserMaster } from './UserMaster';

@Table({
  tableName: 'applications',
  timestamps: true,
  underscored: false,
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
    allowNull: false
  })
  applicant_name!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  dob!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  bank_branch!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phone_number!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email_id!: string;

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

  @BelongsTo(() => UserMaster, 'accepted_by')
  acceptedBy!: UserMaster;
} 