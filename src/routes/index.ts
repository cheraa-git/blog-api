import { authRouter } from './auth.route'
import { articleRouter } from './article.route'
import { Router } from 'express'

const router = Router({ mergeParams: true })

router.use('/auth', authRouter)
router.use('/article', articleRouter)

export default router
