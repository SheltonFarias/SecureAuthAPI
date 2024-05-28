import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '@/services/prisma'
import { storage } from '@/services/multerConfig'
import multer from 'multer';

export class UserController {
  async list(req: Request, res: Response) {
    const users = await prisma.user.findMany()
    return res.status(200).json({ users });
  }

  async get(req: Request, res: Response) {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ user });
  }

  async create(req: Request, res: Response) {
    const user = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordHash = await bcrypt.hash(user.password, 10)
    if (emailRegex.test(user.email)) {
      const createUser = await prisma.user.create({
        data: {
          ...user,
          password: passwordHash
        }
      })
      return res.json(createUser)
    }
    else return res.status(400).json({ error: 'error when creating user' })
  }

  async delete(req: Request, res: Response) {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (user) {
      await prisma.user.delete({ where: { id: parseInt(userId) } });
      return res.status(200).json({ message: 'User deleted successfully' });
    } else return res.status(500).json({ error: 'Error when deleting user by ID' });
  }

  async update(req: Request, res: Response) {
    const userId = req.params.id;
    const user = req.body;
    const users = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (users) {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
          ...user,
          password: user.password ? await bcrypt.hash(user.password, 10) : undefined,
        }
      });
      return res.status(200).json({ user: updatedUser })
    }
    else return res.status(500).json({ error: 'Error updating user' });
  }

  async uploadImg(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      const upload = multer({ storage: storage }).single('file');
      
      upload(req, res, async (err: any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error uploading file' });
        }

        const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

        if (user) {
          const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
              img: req.file.path.replace(/\\/g, "/") // Replace backslashes with forward slashes
            }
          });
          return res.status(200).json({ user: updatedUser });
        } else {
          return res.status(404).json({ error: 'User not found' });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}