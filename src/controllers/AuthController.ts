import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { prisma } from "../services/prisma";
import jwt from 'jsonwebtoken';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { id, firstName, lastName } = user;
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

  
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });

    await prisma.user.update({
      where: { id: user.id },
      data: { token }
    });

    return res.json({ user: { id, email, firstName, lastName }, token });
  }

  async refreshToken() {
    const users = await prisma.user.findMany();

    for (const user of users) {
      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });

      await prisma.user.update({
        where: { id: user.id },
        data: { token }
      });
    }
  }
}

setInterval(async () => {
  const authController = new AuthController();
  await authController.refreshToken();
}, 3600000);