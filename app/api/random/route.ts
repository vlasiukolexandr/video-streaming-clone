import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await serverAuth();
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: '400',
    });
  }
}

export { handler as GET };