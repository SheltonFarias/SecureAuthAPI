import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { prisma } from "../services/prisma"
import jwt from 'jsonwebtoken'


export class AuthController {
  async get(req: Request, res: Response) {
      const users = await prisma.user.findMany()
      return res.status(200).json({ users });
    
  }
 async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({where : { email }})
    
    // trata a informação se nao tiver usuario informado retorna erro
    if(!user) {
      return res.status(404).json({error: "User  not found"})
    }

    // compara a senha presente no banco com a informada
    const isValuePassword = await bcrypt.compare(password, user.password);
    
    // se a comparacao de senha for diferente retorna erro
    if(!isValuePassword) {
      return res.status(401).json({ error: "password invalid" })
    }

    const token = jwt.sign({id: user.id}, "secret", {expiresIn: "1d"})

    const { id } = user

    return res.json({user: { id, email }, token})
  }
}
  