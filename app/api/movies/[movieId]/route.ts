import { NextRequest, NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

async function handler(req: NextRequest, context: { params: { movieId: string } }) {
  try {
    await serverAuth();
    const { movieId } = context.params;

    if (typeof movieId !== 'string' || !movieId) {
      throw new Error('Invalid ID');
    }
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error('Invalid ID');
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: '400',
    });
  }
}

export { handler as GET };