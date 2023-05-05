import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

const create = (userId: number) => {
  if (!JWT_SECRET) throw new Error('process.env.JWT_SECRET is undefined')
  return jwt.sign({ userId }, JWT_SECRET)
}

export const jwtService = {
  create
}
