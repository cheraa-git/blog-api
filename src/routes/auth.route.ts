import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { checkDuplicate } from '../middleware/checkDuplicate'
import { requiredMiddleware } from '../middleware/requiredMiddleware'

const controller = new AuthController()
export const authRouter = Router()

authRouter.post(
  '/register',
  [requiredMiddleware(['email', 'nickname', 'password']), checkDuplicate.email, checkDuplicate.nickname],
  controller.register
)
authRouter.post('/login', [requiredMiddleware(['email', 'password'])], controller.login)
authRouter.post('/autologin', [requiredMiddleware(['token'])], controller.autoLogin)
