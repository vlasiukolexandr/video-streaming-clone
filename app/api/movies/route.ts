import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await serverAuth();
    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: '400',
    });
  }
}

export { handler as GET };