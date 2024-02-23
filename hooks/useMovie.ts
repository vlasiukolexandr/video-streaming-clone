import useSWR, { KeyedMutator } from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from "@prisma/client";


const useMovie = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate
  } as {
    data: Movie;
    error: any;
    isLoading: boolean;
    mutate: KeyedMutator<Movie>;
  }
}

export default useMovie;
 