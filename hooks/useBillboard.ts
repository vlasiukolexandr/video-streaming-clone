import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from "@prisma/client";

const useBillboard = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/random', fetcher, {
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
    data: Movie
  }
}

export default useBillboard;
 