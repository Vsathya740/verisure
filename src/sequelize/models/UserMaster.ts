import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { OrganisationMaster } from './OrganisationMaster';
import { BankMaster } from './BankMaster';
import { BankBranchMaster } from './BankBranchMaster';

@Table({
  tableName: 'user_master',
  timestamps: true
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
    allowNull: false,
    field: 'full_name'
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
    allowNull: false,
    field: 'is_active'
  })
  isActive!: boolean;

  @ForeignKey(() => OrganisationMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'organisation_id'
  })
  organisationId!: number;

  @ForeignKey(() => BankMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'bank_id'
  })
  bankId!: number;

  @ForeignKey(() => BankBranchMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'bank_branch_id'
  })
  bankBranchId!: number;

  @BelongsTo(() => OrganisationMaster)
  organisation!: OrganisationMaster;

  @BelongsTo(() => BankMaster)
  bank!: BankMaster;

  @BelongsTo(() => BankBranchMaster)
  bankBranch!: BankBranchMaster;
} 