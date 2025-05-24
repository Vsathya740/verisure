import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { UserMaster } from './UserMaster';
import { Application } from './Application';

@Table({
  tableName: 'telephone_verifications',
  timestamps: true
})
export class TelephoneVerification extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @ForeignKey(() => Application)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'application_id'
  })
  applicationID!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  phone_number!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  person_contacted!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  relation_with_applicant!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  verification_remarks!: string;

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

  @BelongsTo(() => Application)
  application!: Application;

  @BelongsTo(() => UserMaster, 'accepted_by')
  acceptedBy!: UserMaster;
} 