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
  phone_number!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  person_contacted!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  relation_with_applicant!: string;

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