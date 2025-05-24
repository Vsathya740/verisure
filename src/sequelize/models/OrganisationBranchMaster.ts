import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { OrganisationMaster } from './OrganisationMaster';

@Table({
  tableName: 'organisation_branch_master'
})
export class OrganisationBranchMaster extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @ForeignKey(() => OrganisationMaster)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'org_id'
  })
  orgId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'branch_name'
  })
  branchName!: string;

  @Column({
    type: DataType.ENUM('active', 'inactive'),
    defaultValue: 'active',
    allowNull: false
  })
  status!: 'active' | 'inactive';

  @BelongsTo(() => OrganisationMaster, 'org_id')
  organisation!: OrganisationMaster;
} 