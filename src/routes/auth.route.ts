import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { checkDuplicate } from '../middleware/checkDuplicate'
import { check } from 'express-validator'

const controller = new AuthController()
export const authRouter = Router()

const registerMiddlewares = [
  checkDuplicate.email,
  checkDuplicate.nickname,
  check('email', 'Email cannot be empty').notEmpty(),
  check('nickname', 'Nickname cannot be empty').notEmpty(),
  check('password', 'The minimum password length should be 6 characters').isLength({ min: 6 })
]

authRouter.post('/register', registerMiddlewares, controller.register)
authRouter.post('/login', controller.login)
