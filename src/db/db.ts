import { Sequelize } from 'sequelize-typescript'
import { User } from './models/User'
import { Article } from './models/Article'

const connection = new Sequelize({
  dialect: 'postgres',
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  logging: false,
  models: [User, Article],
  pool: {
    max: 5,
    min: 0,
    idle: 300000,
    acquire: 300000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    native: true

  }
})

export default connection



