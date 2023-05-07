import { NextFunction, Request, Response } from 'express'

export const requiredMiddleware = (fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const emptyFields: string[] = []
  fields.forEach(field => {
    if (req.body[field] === undefined) emptyFields.push(field)
  })
  if (emptyFields.length > 0) {
    return res.status(400).json({ message: `Field(s): ${emptyFields.join(', ')} is(are) required` })
  }
  next()
}
