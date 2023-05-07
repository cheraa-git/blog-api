import { NextFunction, Request, Response } from 'express'
import { jwtService } from '../services/jwt.service'
import { sendError } from '../services/error.service'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    const userId = jwtService.verify(token)
    if (!token || !userId) return sendError.unauthorized(res, 'The user is not authorized')
    req.body.userId = userId
    next()
  } catch (error) {
    sendError.server(res, '', error)
  }
}

export const authMiddleware = {
  checkToken
}
