import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

type TokenPayload = {
  id: string
  iat: number
  exp: number
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers
  const [type, token] = authorization.split(' ')

  try {
    if (!authorization && type !== 'Bearer') {
      return res.status(401).json({ error: 'Invalid token type' })
    }
    const decoded = jwt.verify(token, 'secret') as TokenPayload
    req.userId = decoded.id
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid' })
  }
}