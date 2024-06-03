import { NextFunction, Request, Response } from "express";
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
  const { authorization } = req.headers // Extrair os parametros da solicitação
  const [type, token] = authorization.split(' ')  // dividir authorization extraindo o campo referente a token   
  const decoded = jwt.verify(token, 'secret')
  const { id } = decoded as TokenPayload
  req.useId = id
  if (type !== "Bearer" || !decoded) {
    return res.status(401).json({ error: '' })
  }
}