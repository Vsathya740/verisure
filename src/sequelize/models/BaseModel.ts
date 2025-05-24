import { Model } from 'sequelize-typescript';
import { Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: true
})
export class BaseModel extends Model {
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
} 