import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '@/services/prisma'

export class UserController {
  async list(req: Request, res: Response) {
    const users = await prisma.user.findMany()
    return res.status(200).json({ users });
  }

  async get(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.error('Error when searching for user', error);
      return res.status(500).json({ error: 'Error when searching for user' });
    }
  }

  async create(req: Request, res: Response) {
    const user = req.body;
    const userExists = await prisma.user.findUnique({ where: { email: user.email } })
    const passwordHash = await bcrypt.hash(user.password, 10)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const users = /* isCreated() ? */  await prisma.user.create({
      data: {
        ...user,
        password: passwordHash
        /* : null */
      }
    })
    // if (user) return res.json(user)
    // else return res.status(400).json({ error: 'error when creating user' })
    if ((userExists) && (user.email.length < 5 || user.email.length > 100) && (!emailRegex.test(user.email))) {
      return res
        .status(400)
        .json({ error: 'error when creating user' })
    }
    return res.json({ users, message: 'Create User sucess' })
  }

  async delete(req: Request, res: Response) {
    const userId = req.params.id; // Extrai o ID do parâmetro da rota
    try {
      const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await prisma.user.delete({ where: { id: parseInt(userId) } });
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error when deleting user by ID:', error);
      return res.status(500).json({ error: 'Error when deleting user by ID' });
    }
  }

  async update(req: Request, res: Response) {
    const userId = req.params.id;
    const user = req.body;
    const users = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        ...user,
        password: user.password ? await bcrypt.hash(user.password, 10) : undefined,
      }
    });
    if (users) {
      return res.status(200).json({ user: updatedUser });
    } else {
      return res.status(500).json({ error: 'Error updating user' });
    }
  }
}