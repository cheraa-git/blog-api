import { ArticleController } from '../controllers/article.controller'
import { Router } from 'express'

const controller = new ArticleController()
export const articleRouter = Router()

articleRouter.post('/', controller.create)
articleRouter.put('/', controller.update)
