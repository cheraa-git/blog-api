import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('process.env.JWT_SECRET is undefined')
}

export const jwtService = {
  create: (userId: number): string => {
    return jwt.sign({ userId }, JWT_SECRET)
  },
  verify: (token?: string): number | null => {
    if (!token) return null
    try {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload
      return payload?.userId
    } catch (error) {
      return null
    }
  }
}
