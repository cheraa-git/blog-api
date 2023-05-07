import { NextFunction, Request, Response } from 'express'
import { User } from '../db/models/User'
import { sendError } from '../services/error.service'

const email = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ where: { email } })
    if (user) return sendError.auth(res, 'Email already exists')
    next()
  } catch (error) {
    sendError.server(res, '', error)
  }
}

const nickname = async (req: Request, res: Response, next: NextFunction) => {
  const { nickname } = req.body
  try {
    const user = await User.findOne({ where: { nickname } })
    if (user) return sendError.auth(res, 'Nickname already exists')
    next()
  } catch (error) {
    sendError.server(res, '', error)
  }
}


export const checkDuplicate = { email, nickname }
