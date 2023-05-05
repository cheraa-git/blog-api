import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import * as bcrypt from 'bcrypt'
import { User } from '../db/models/User'
import { jwtService } from '../services/jwt.service'


export class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors: errors.array() })
      }
      const { email, password, nickname } = req.body
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = await User.create({ nickname, email, password: hashPassword })
      res.json({ ...user.dataValues, token: jwtService.create(user.id) })
    } catch (error) {
      res.status(400).json({ message: 'Registration error', error })
    }
  }
}
