import { useCallback } from "react";
import { FieldValue, FieldValues, UseFormSetError } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useLogin = ({ setError }: { setError: UseFormSetError<FieldValues> }) => {
  const router = useRouter();

  const loginHandler = useCallback(async(data: FieldValue<{ [x: string]: any }>) => {
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/'
      });
      if (response?.ok) {
        router.push('/');
      } else {
        setError('root.serverError', { 
          type: response?.status.toString(),
          message: 'Wrong email or password'
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [router, setError]);

  return {
    loginHandler,
  }
}