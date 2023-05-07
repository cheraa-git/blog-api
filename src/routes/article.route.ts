import { ArticleController } from '../controllers/article.controller'
import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'

const controller = new ArticleController()
export const articleRouter = Router()

articleRouter.post('/', [authMiddleware.checkToken], controller.create)
articleRouter.put('/', [authMiddleware.checkToken], controller.update)
articleRouter.delete('/:id', [authMiddleware.checkToken], controller.remove)
articleRouter.get('/:id', controller.get)
articleRouter.get('/', controller.getRange)
