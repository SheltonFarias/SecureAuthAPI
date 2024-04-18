import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { prisma } from "../services/prisma"
import { error } from "console";

export class UserController {
  async get(req: Request, res: Response) {
      const users = await prisma.user.findMany()
      return res.status(200).json({ users });
    
  }
 async create(req: Request, res: Response) {
    const { email, firstName, lastName, password } = req.body;

    const userExists = await prisma.user.findUnique({where : { email }})

    if(userExists) {
      return res.json({error: "User exists"})
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: passwordHash
      }
    })
    if (email.length < 5 || email.length > 100) {
      return res
      .status(400)
      .json({ error: 'O campo "email" deve ter entre 5 e 100 caracteres.' })
    } 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Verifica o formato do email
    
    if (!emailRegex.test(email)) {
      return res
      .status(400)
      .json({ error: 'O campo "email" não está em um formato válido.' })
    }
    return res.json({user})
  }
}