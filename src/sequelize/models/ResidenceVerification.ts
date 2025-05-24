import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { UserMaster } from './UserMaster';
import { Application } from './Application';

@Table({
  tableName: 'residence_verifications',
  timestamps: true,
  underscored: true
})
export class ResidenceVerification extends BaseModel {
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
    type: DataType.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('residence_coordinates');
      return value ? JSON.parse(value) : null;
    },
    set(value: any) {
      this.setDataValue('residence_coordinates', value ? JSON.stringify(value) : null);
    }
  })
  residence_coordinates!: any;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  residence_address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  permanent_address!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  years_at_residence!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  address_confirmed_by!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  residents_count!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  residence_status!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true
  })
  approx_rent!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true
  })
  approx_value_if_owned!: number;

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