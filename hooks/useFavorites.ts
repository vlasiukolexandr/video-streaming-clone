import useSWR, { KeyedMutator } from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from "@prisma/client";

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/favorites', fetcher, {
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
    data: Movie[];
    error: any;
    isLoading: boolean;
    mutate: KeyedMutator<Movie[]>;
  }
}

export default useFavorites;
 