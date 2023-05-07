import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import { User } from '../db/models/User'
import { jwtService } from '../services/jwt.service'


export class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const email = req.body.email.trim().toLowerCase()
      const nickname = req.body.nickname.trim().toLowerCase()
      const hashPassword = bcrypt.hashSync(req.body.password, 7)
      const user = await User.create({ nickname, email, password: hashPassword })
      res.json({ ...user.dataValues, token: jwtService.create(user.id), password: undefined })
    } catch (error) {
      res.status(500).json({ message: 'Registration error', error })
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const email = req.body.email.trim().toLowerCase()
      const password = req.body.password.trim()
      const user = await User.findOne({ where: { email } })
      if (!user) return res.status(404).json({ message: 'No user with this email was found' })
      const passwordIsValid = bcrypt.compareSync(password, user.password)
      if (!passwordIsValid) return res.status(401).json({ message: 'The password is invalid' })
      res.json({ ...user.dataValues, token: jwtService.create(user.id), password: undefined })
    } catch (error) {
      res.status(500).json({ message: 'Authorization error', error })
    }
  }

  autoLogin = async ({ body: { token } }: Request, res: Response) => {
    try {
      const userId = jwtService.verify(token)
      if (!userId) return res.status(401).json({ message: 'invalid token' })
      const user = await User.findOne({ where: { id: userId } })
      if (!user) return res.status(401).json({ message: 'invalid token' })
      res.json({ ...user.dataValues, token, password: undefined })
    } catch (error) {
      res.status(500).json({ message: 'Authorization error', error })
    }
  }
}
