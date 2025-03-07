// lib/auth.ts
import { prisma} from '@/lib/prisma';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function authUser(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: { email }
  });

  console.log(user)
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isValidPassword = await compare(password, user.password);
  console.log(isValidPassword)
  if (!isValidPassword) {
    throw new Error("Senha incorreta");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  return { token, role: user.role as 'ADMIN' | 'USER' };
}
