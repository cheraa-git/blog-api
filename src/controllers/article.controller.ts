import { Request, Response } from 'express'
import { Article } from '../db/models/Article'

export class ArticleController {
  create = async (req: Request, res: Response) => {
    const { userId, title, content, imageUrl } = req.body
    try {
      const article = await Article.create({ userId, title, content, imageUrl })
      res.json({ ...article.dataValues })
    } catch (error) {
      res.status(500).json({ message: 'Creating article error', error })
    }
  }
}
