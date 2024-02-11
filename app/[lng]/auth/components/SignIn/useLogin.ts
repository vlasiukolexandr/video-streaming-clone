import { useCallback } from "react";
import { FieldValue, FieldValues, UseFormSetError } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MAIN_PAGE } from "@/app/constants";

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
        if (!response.error) {
          router.push('/uk-UA' + MAIN_PAGE);
          return;
        }
      }
      setError('root.serverError', { 
        type: response?.status.toString(),
        message: 'login_form.server_error'
      });
    } catch (error) {
      console.log(error);
    }
  }, [router, setError]);

  return {
    loginHandler,
  }
}