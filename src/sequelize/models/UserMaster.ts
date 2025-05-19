import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { OrganisationMaster } from './OrganisationMaster';
import { BankMaster } from './BankMaster';
import { BankBranchMaster } from './BankBranchMaster';

@Table({
  tableName: 'user_master',
  timestamps: true,
  createdAt: true,
  updatedAt: true
})
export class UserMaster extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  fullName!: string;

  @Column({
    type: DataType.ENUM('ADMIN', 'USER'),
    defaultValue: 'USER',
    allowNull: false
  })
  role!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false
  })
  isActive!: boolean;

  @ForeignKey(() => OrganisationMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  organisation_id!: number;

  @ForeignKey(() => BankMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  bank_id!: number;

  @ForeignKey(() => BankBranchMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  bank_branch_id!: number;

  @BelongsTo(() => OrganisationMaster)
  organisation!: OrganisationMaster;

  @BelongsTo(() => BankMaster)
  bank!: BankMaster;

  @BelongsTo(() => BankBranchMaster)
  bank_branch!: BankBranchMaster;
} 