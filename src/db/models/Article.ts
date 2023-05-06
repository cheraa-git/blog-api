import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from './User'

@Table({ tableName: 'articles' })
export class Article extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  })
  id!: number

  @ForeignKey(() => User)
  @Column
  userId!: number

  @Column({ type: DataType.STRING, allowNull: false })
  createdAt!: string

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string

  @Column({ type: DataType.STRING })
  imageUrl!: string

  @Column({ type: DataType.STRING })
  content: string
}
