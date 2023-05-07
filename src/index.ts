import * as express from 'express'
import { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import connection from './db/db'
import router from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use('/api/v1', router)

connection.sync()
  .then(() => console.log('Database synced success'))
  .catch((err) => console.log('DATABASE_ERROR', err))

app.get('/', (req: Request, res: Response) => {
  res.redirect('https://github.com/cheraa-git/blog-api')
})

app.listen(PORT, () => {
  console.log(`\nApp listen on port ${PORT}...`)
})
