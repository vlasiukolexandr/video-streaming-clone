import useSWR, { KeyedMutator } from 'swr';
import fetcher from '@/lib/fetcher';
import { User } from '@prisma/client';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  } as {
    data: User;
    error: any;
    isLoading: boolean;
    mutate: KeyedMutator<User>;
  }
}

export default useCurrentUser;
 