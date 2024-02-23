import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';

import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

async function handler(req: Request, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth();
      const { movieId } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if(!existingMovie) {
        throw new Error('Invalid ID');
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return NextResponse.json(user);
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth();
      const { movieId } = await req.json();
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if(!existingMovie) {
        throw new Error('Invalid ID');
      }

      const updateFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: updateFavoriteIds,
        },
      });

      return NextResponse.json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: '400',
    });
  }
}

export { handler as POST, handler as DELETE };