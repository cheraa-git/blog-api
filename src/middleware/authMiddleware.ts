import { NextFunction, Request, Response } from 'express'
import { jwtService } from '../services/jwt.service'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    const userId = jwtService.verify(token)
    if (!token || !userId) {
      return res.status(403).json({ message: 'The user is not authorized' })
    }
    req.body.userId = userId
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Server error' })
  }
}

export const authMiddleware = {
  checkToken
}
