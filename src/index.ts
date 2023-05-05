import * as express from 'express'
import { Request, Response } from 'express'

const app = express()
const { PORT = 8080 } = process.env

app.get('/', (req: Request, res: Response) => {
  console.log('GET', new Date().toLocaleTimeString())
  res.send('Server is working...')
})
app.listen(PORT, () => {
  console.log(`\nApp listen on port ${PORT}...`)
})
