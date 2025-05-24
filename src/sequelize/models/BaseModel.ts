import { Model } from 'sequelize-typescript';
import { Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: false
})
export class BaseModel extends Model {
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
} 