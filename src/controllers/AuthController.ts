import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '@/services/prisma';
import jwt from 'jsonwebtoken';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password, login } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { login }
        ]
      }
    })
    const token = user ? jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' }) : null;
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'invalid credentials' });
    }
    delete user.password

    await prisma.user.update({
      where: { id: user.id },
      data: { token }
    });
    return res.json({ user });
  }
}