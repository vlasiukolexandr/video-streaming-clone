import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth();
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds
        }
      }
    });

    return NextResponse.json(favoriteMovies);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: '400',
    });
  }
}

export { handler as GET };