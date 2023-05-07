import { Request, Response } from 'express'
import { Article } from '../db/models/Article'
import { sendError } from '../services/error.service'

export class ArticleController {
  create = async (req: Request, res: Response) => {
    const { userId, title, content, imageUrl } = req.body
    try {
      const article = await Article.create({ userId, title, content, imageUrl })
      res.json({ ...article.dataValues })
    } catch (error) {
      sendError.server(res, 'Article creation error', error)
    }
  }
  update = async (req: Request, res: Response) => {
    const { id, userId, title, content, imageUrl } = req.body
    try {
      const article = await Article.update({ title, content, imageUrl }, { where: { id, userId }, returning: ['*'] })
      res.json({ ...article[1][0].dataValues })
    } catch (error) {
      sendError.server(res, 'Article updating error', error)
    }
  }

  remove = async (req: Request, res: Response) => {
    const id = +req.params.id
    const userId = +req.body.userId
    try {
      const removedRows = await Article.destroy({ where: { id, userId } })
      res.json({ removedRows, userId })
    } catch (error) {
      sendError.server(res, 'Article removing error', error)
    }
  }

  get = async (req: Request, res: Response) => {
    const id = +req.params.id
    try {
      const article = await Article.findOne({ where: { id } })
      if (!article) return sendError.notFound(res, 'Article not found')
      res.json({ ...article.dataValues })
    } catch (error) {
      sendError.server(res, 'Article getting error', error)
    }
  }

  getRange = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 0
    const pageSize = Number(req.query.pageSize) || 20
    try {
      const articles = await Article.findAll({ offset: page * pageSize, limit: page * pageSize + pageSize })
      res.json(articles)
    } catch (error) {
      sendError.server(res, 'Articles getting error', error)
    }
  }
}
