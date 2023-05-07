import { Request, Response } from 'express'
import { Article } from '../db/models/Article'
import { sendError } from '../services/error.service'

export class ArticleController {
  create = async (req: Request, res: Response) => {
    const { userId, title, content, imageUrl } = req.body
    try {
      const article = await Article.create({ userId, title, content, imageUrl })
      res.json({ ...article.dataValues })
    } catch (error: any) {
      sendError.server(res, error?.message, error)
    }
  }
  update = async (req: Request, res: Response) => {
    const { id, userId, title, content, imageUrl } = req.body
    if (!title && !content && !imageUrl) return sendError.badRequest(res, 'Enter the article details')
    try {
      const [count, rows] = await Article.update({ title, content, imageUrl }, {
        where: { id, userId }, returning: ['*']
      })
      if (count === 0) return sendError.notFound(res, 'Article not found')
      res.json({ ...rows?.[0]?.dataValues })
    } catch (error: any) {
      sendError.server(res, error?.message, error)
    }
  }

  remove = async (req: Request, res: Response) => {
    const id = +req.params.id
    const userId = +req.body.userId
    if (!id) return sendError.badRequest(res, 'Invalid ID')
    try {
      const removedRows = await Article.destroy({ where: { id, userId } })
      if (removedRows === 0) return sendError.notFound(res, 'Article not found')
      res.json({ id })
    } catch (error: any) {
      sendError.server(res, error?.message, error)
    }
  }

  get = async (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id) return sendError.badRequest(res, 'Invalid ID')
    try {
      const article = await Article.findOne({ where: { id } })
      if (!article) return sendError.notFound(res, 'Article not found')
      res.json({ ...article.dataValues })
    } catch (error: any) {
      sendError.server(res, error?.message, error)
    }
  }

  getRange = async (req: Request, res: Response) => {
    const page = Number(req.query.page) >= 0 ? Number(req.query.page) : 0
    let pageSize = Number(req.query.pageSize) >= 0 ? Number(req.query.pageSize) : 20
    if (pageSize > 100) {
      pageSize = 100
    }
    try {
      const response = await Article.findAndCountAll({ offset: page * pageSize, limit: pageSize })
      res.json({ articles: response.rows, countAll: response.count })
    } catch (error: any) {
      sendError.server(res, error?.message, error)
    }
  }
}
