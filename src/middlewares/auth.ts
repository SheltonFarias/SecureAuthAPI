import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

type TokenPayload = {
  id: string
  iat: number
  exp: number
}

export function authMiddlwares(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [token] = authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, 'secret')
    const { id } = decoded as TokenPayload

    req.useId = id
    res.status(201).json({ message:'authorized access' })
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}