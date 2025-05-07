import { Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BankMaster } from './BankMaster';

@Table({
  tableName: 'bank_branch_master',
  timestamps: true
})
export class BankBranchMaster extends BaseModel {
  @Column(DataType.STRING)
  branch_name!: string;

  @Column(DataType.STRING)
  branch_code!: string;

  @ForeignKey(() => BankMaster)
  @Column(DataType.INTEGER)
  bank_id!: number;

  @Column(DataType.BOOLEAN)
  status!: boolean;
} 