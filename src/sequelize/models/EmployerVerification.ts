import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { UserMaster } from './UserMaster';
import { Application } from './Application';

@Table({
  tableName: 'employer_verifications',
  timestamps: true,
  underscored: true
})
export class EmployerVerification extends BaseModel {
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
  applicationId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  employer_name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('employer_coordinates');
      return value ? JSON.parse(value) : null;
    },
    set(value: any) {
      this.setDataValue('employer_coordinates', value ? JSON.stringify(value) : null);
    }
  })
  employer_coordinates!: any;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  employer_address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  designation!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  department!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true
  })
  salary!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  employment_status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  years_of_service!: number;

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