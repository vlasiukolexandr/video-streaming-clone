import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

async function handler(req: Request) {
  try {
    const { email, name, password }  = await req.json();

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      }
    });

    if (existingUser) {
      return NextResponse.json({
        error: 'Email taken',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date,
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: (error as Error).message });
  }
}

export { handler as POST }
