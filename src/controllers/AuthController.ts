import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '@/services/prisma';
import jwt from 'jsonwebtoken';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email , password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const {password: userPassword, ...userData} = user 
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

    await prisma.user.update({
      where: { id: user.id },
      data: { token }
    });

    return res.json({ user:{userData}, token });
  }
}