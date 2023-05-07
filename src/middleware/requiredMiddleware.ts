import { NextFunction, Request, Response } from 'express'
import { sendError } from '../services/error.service'

export const requiredMiddleware = (fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const emptyFields: string[] = []
  fields.forEach(field => {
    if (req.body[field] === undefined) emptyFields.push(field)
  })
  if (emptyFields.length > 0) {
    return sendError.badRequest(res, `Field(s): ${emptyFields.join(', ')} is(are) required`)
  }
  next()
}
