import { Request, Response } from 'express'
import { prisma } from '@/services/prisma'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password, login } = req.body
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { login }
        ]
      }
    })
    const sha256Password = crypto.createHash('sha256').update(password).digest('hex')
    const token = user ? jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' }) : null
    if (!user && sha256Password !== user.password) {
      return res.status(401).json({ message: 'invalid credentials' })
    }
    delete user.password

    await prisma.user.update({
      where: { id: user.id },
      data: { token }
    })
    return res.json({ user })
  }
}