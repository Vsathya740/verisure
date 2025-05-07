import { Model } from 'sequelize-typescript';

export class BaseModel extends Model {
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
} 