import { Request, Response } from 'express';
import { prisma } from '@/services/prisma';
import crypto from 'crypto';
import { upload } from '@/services/multerConfig';

export class UserController {
  async list(req: Request, res: Response) {
    const users = await prisma.user.findMany()
    return res.status(200).json({ users })
  }

  async get(req: Request, res: Response) {
    const userId = req.params.id
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } })
    if (user) return res.status(200).json({ user })
    return res.status(200).json({ user })
  }

  async create(req: Request, res: Response) {
    const user = req.body
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const sha256Password = crypto.createHash('sha256').update(user.password).digest('hex')
    if (emailRegex.test(user.email)) {
      const createUser = await prisma.user.create({
        data: {
          ...user,
          password: sha256Password
        }
      })
      return res.json(createUser)
    }
    else return res.status(400).json({ error: 'error when creating user' })
  }

  async delete(req: Request, res: Response) {
    const userId = req.params.id
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } })
    if (user) {
      await prisma.user.delete({ where: { id: parseInt(userId) } })
      return res.status(200).json({ message: 'User deleted successfully' })
    } else return res.status(400).json({ error: 'Error when deleting user by ID' })
  }

  async update(req: Request, res: Response) {
    const userId = req.params.id
    const user = req.body
    const users = await prisma.user.findUnique({ where: { id: parseInt(userId) } })
    if (users) {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
          ...user,
          password: user.password ? crypto.createHash('sha256').update(user.password).digest('hex') : undefined,
        }
      })
      return res.status(200).json({ user: updatedUser })
    }
    else return res.status(500).json({ error: 'Error updating user' })
  }

  async uploadImg(req: Request, res: Response) {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Error on file upload' });
      }

      const userId = req.params.id;
      const filePath = `uploads/${userId}/${req.file.filename}`;

      try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
        if (user && req.file) {
          const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { img: filePath }
          });
          return res.status(200).json({ user: updatedUser });
        } else {
          return res.status(400).json({ error: 'User not found or no file uploaded' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  }
}
