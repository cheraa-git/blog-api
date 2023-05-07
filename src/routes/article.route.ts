import { ArticleController } from '../controllers/article.controller'
import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { requiredMiddleware } from '../middleware/requiredMiddleware'

const controller = new ArticleController()
export const articleRouter = Router()

articleRouter.post('/', [requiredMiddleware(['title']), authMiddleware.checkToken], controller.create)
articleRouter.put('/', [authMiddleware.checkToken, requiredMiddleware(['id'])], controller.update)
articleRouter.delete('/:id', [authMiddleware.checkToken], controller.remove)
articleRouter.get('/:id', controller.get)
articleRouter.get('/', controller.getRange)
