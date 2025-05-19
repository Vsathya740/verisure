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
    type: DataType.STRING(100),
    allowNull: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    defaultValue: null
  })
  date_of_birth!: Date | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  password!: string;

  @ForeignKey(() => OrganisationMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  organisation_id!: number;

  @ForeignKey(() => BankMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  bank_id!: number;

  @ForeignKey(() => BankBranchMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  bank_branch_id!: number;

  @BelongsTo(() => OrganisationMaster)
  organisation!: OrganisationMaster;

  @BelongsTo(() => BankMaster)
  bank!: BankMaster;

  @BelongsTo(() => BankBranchMaster)
  bank_branch!: BankBranchMaster;
} 