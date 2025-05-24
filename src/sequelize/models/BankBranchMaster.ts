import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BankMaster } from './BankMaster';

@Table({
  tableName: 'bank_branch_master'
})
export class BankBranchMaster extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @ForeignKey(() => BankMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'bank_id'
  })
  bankId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'branch_name'
  })
  branchName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'branch_code'
  })
  branchCode!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  pincode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  email!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  })
  isActive!: boolean;

  @BelongsTo(() => BankMaster, 'bank_id')
  bank!: BankMaster;
} 