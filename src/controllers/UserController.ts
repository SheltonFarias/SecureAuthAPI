import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { prisma } from "@/services/prisma"

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
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.error("Erro ao procurar usuario", error);
      return res.status(500).json({ error: "Erro ao procurar o usuario" });
    }
  }

  async create(req: Request, res: Response) {
    const { email, firstName, lastName, password, photograph, token } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email } })
    const passwordHash = await bcrypt.hash(password, 10)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: passwordHash,
        photograph,
        token
      }
    })
    if (userExists) {
      return res.json({ error: "User exists" })
    }
    if (email.length < 5 || email.length > 100) {
      return res
        .status(400)
        .json({ error: 'O campo "email" deve ter entre 5 e 100 caracteres.' })
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: 'O campo "email" não está em um formato válido.' })
    }
    return res.json({ user, message: 'Usuario criado com sucesso' })
  }

  async delete(req: Request, res: Response) {
    const userId = req.params.id; // Extrai o ID do parâmetro da rota
    try {
      const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      await prisma.user.delete({ where: { id: parseInt(userId) } });
      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar usuário por ID:", error);
      return res.status(500).json({ error: "Erro ao deletar usuário por ID" });
    }
  }
  async update(req: Request, res: Response) {
    const userId = req.params.id;
    const { email, firstName, lastName, password, photograph, token } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
          email,
          firstName,
          lastName,
          password: password ? await bcrypt.hash(password, 10) : undefined,
          photograph,
          token
        }
      });
      return res.status(200).json({ user: updatedUser });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }
}