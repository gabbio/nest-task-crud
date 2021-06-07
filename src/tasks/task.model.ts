import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'tasks' })
export class Task extends Model {
  @Column
  name: string;
}
