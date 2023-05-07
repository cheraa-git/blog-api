import { NextFunction, Request, Response } from 'express'
import { jwtService } from '../services/jwt.service'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: 'The user is not authorized' })
    }
    req.body.userId = jwtService.verify(token)
    next()
  } catch (error) {
    return res.status(403).json({ message: 'The user is not authorized' })
  }
}

export const authMiddleware = {
  checkToken
}
