'use client';

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import SignUpForm from "./components/SignUp";
import SignInForm from "./components/SignIn";
import { useTranslation } from "@/app/i18n/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MAIN_PAGE } from "@/app/constants";

enum FormVariant {
  LOGIN,
  CREATE_ACCOUNT
}

const UNAUTHENTICATED = 'unauthenticated';
const AUTHENTICATED = 'authenticated';

const Auth = () => {
  const session = useSession()
  const router = useRouter();

  const { t } = useTranslation();
  const [variant, setVariant] = useState<FormVariant>(FormVariant.LOGIN);

  const toggleVarian = useCallback(() => {
    setVariant(
      (currentVarian: FormVariant) => 
        currentVarian === FormVariant.LOGIN ? FormVariant.CREATE_ACCOUNT : FormVariant.LOGIN);
  }, []);

  useEffect(() => {
    if (session.status === AUTHENTICATED) {
      router.push(MAIN_PAGE);
    }
  }, [session.status]);

  if (session.status !== UNAUTHENTICATED) return null;

  return (
    <div className="relative h-full w-full bg-auth-main bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={24}
          />
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md w-full">
              {variant === FormVariant.LOGIN ? <SignInForm /> : <SignUpForm />}
              <p className="text-neutral-500 mt-12 flex justify-between">
                {variant === FormVariant.LOGIN ? t('change_form_label_login') : t('change_form_label_signin')}
                <span
                  className="text-white ml-1 hover:underline cursor-pointer"
                  onClick={toggleVarian}
                >
                  {variant === FormVariant.LOGIN ? t('create_and_account') : t('login')}
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Auth;