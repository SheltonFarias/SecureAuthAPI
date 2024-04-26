import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "@/services/prisma";
import jwt from "jsonwebtoken";

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const { id, firstName, lastName } = user;
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });

    await prisma.user.update({
      where: { id: user.id },
      data: { token }
    });

    return res.json({ user: { id, firstName, lastName, email }, token });
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

// Llamar a refreshToken cada hora
setInterval(async () => {
  const authController = new AuthController();
  await authController.refreshToken();
}, 3600000);
