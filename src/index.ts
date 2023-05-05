import * as express from 'express'
import { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import connection from './db/db'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

connection.sync()
  .then(() => console.log('Database synced success'))
  .catch((err) => console.log('DATABASE_ERROR', err))

app.get('/', (req: Request, res: Response) => {
  console.log('GET', new Date().toLocaleTimeString())
  res.send('Server is working...')
})

app.listen(PORT, () => {
  console.log(`\nApp listen on port ${PORT}...`)
})
