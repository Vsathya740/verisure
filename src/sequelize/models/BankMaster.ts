import { Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { OrganisationMaster } from './OrganisationMaster';

@Table({
  tableName: 'bank_master'
})
export class BankMaster extends BaseModel {
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
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  code!: string;

  @ForeignKey(() => OrganisationMaster)
  @Column({
    type: DataType.INTEGER,
    field: 'org_id'
  })
  orgId!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  status!: boolean;
} 