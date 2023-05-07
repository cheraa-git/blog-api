import { Response } from 'express'

type ErrorPayload = { name: string, message?: string, data?: any }

export const sendError = {
  server: (res: Response, message?: string, data?: any): ErrorPayload => {
    const payload = { name: 'ServerError', message, data }
    res.status(500).json(payload)
    return payload
  },
  notFound: (res: Response, message?: string): ErrorPayload => {
    const payload = { name: 'NotFoundError', message }
    res.status(404).json(payload)
    return payload
  },
  auth: (res: Response, message?: string): ErrorPayload => {
    const payload = { name: 'AuthorizationError', message }
    res.status(400).json(payload)
    return payload
  },
  unauthorized: (res: Response, message?: string): ErrorPayload => {
    const payload = { name: 'Unauthorized', message }
    res.status(401).json(payload)
    return payload
  },
  badRequest: (res: Response, message: string): ErrorPayload => {
    const payload = { name: 'BadRequest', message }
    res.status(400).json(payload)
    return payload
  }
}
