import { Column, DataType, Model, Table } from 'sequelize-typescript'


@Table({ timestamps: false, tableName: 'user' })
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  })
  id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  nickname!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string

  @Column({ type: DataType.STRING })
  password!: string
}
