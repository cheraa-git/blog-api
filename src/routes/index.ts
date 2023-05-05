import * as express from 'express'
import { authRouter } from './auth.route'

const router = express.Router({ mergeParams: true })

router.use('/auth', authRouter)

export default router
