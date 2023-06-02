'use client';

import React, { useCallback, useState } from "react";
import Image from "next/image";
import SignInForm from "@/components/pages/SignIn";
import SignUpForm from "@/components/pages/SignUp";

enum FormVariant {
  LOGIN,
  CREATE_ACCOUNT
}

const Auth = () => {
  const [variant, setVariant] = useState<FormVariant>(FormVariant.LOGIN);

  const toggleVarian = useCallback(() => {
    setVariant(
      (currentVarian: FormVariant) => 
        currentVarian === FormVariant.LOGIN ? FormVariant.CREATE_ACCOUNT : FormVariant.LOGIN);
  }, []);

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
              <p className="text-neutral-500 mt-12">
                {variant === FormVariant.LOGIN ? 'First time using Netflix?' : 'Already have an account'}
                <span
                  className="text-white ml-1 hover:underline cursor-pointer"
                  onClick={toggleVarian}
                >
                  {variant === FormVariant.LOGIN ? 'Create and account' : 'Login'}
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