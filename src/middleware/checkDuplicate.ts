import { NextFunction, Request, Response } from 'express'
import { User } from '../db/models/User'

const email = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ where: { email } })
    if (user) return res.status(400).json({ message: 'Email already exists' })
    next()
  } catch (error) {
    res.status(500).json(error)
  }
}

const nickname = async (req: Request, res: Response, next: NextFunction) => {
  const { nickname } = req.body
  try {
    const user = await User.findOne({ where: { nickname } })
    if (user) return res.status(400).json({ message: 'Nickname already exists' })
    next()
  } catch (error) {
    res.status(500).json(error)
  }
}


export const checkDuplicate = { email, nickname }
