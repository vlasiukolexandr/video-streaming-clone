'use client';

import { Input } from "@/components/Input";
import Image from "next/image";
import React, { SetStateAction, useCallback, useMemo, useState } from "react";

enum FormVariant {
  LOGIN = 'login',
  CREATE_ACCOUNT = 'createAccount'
}

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState(FormVariant.LOGIN);

  const toggleVarian = useCallback(() => {
    setVariant((currentVarian) => currentVarian === FormVariant.LOGIN ? FormVariant.CREATE_ACCOUNT : FormVariant.LOGIN);
  }, []);

  const title = useMemo(() => variant === FormVariant.LOGIN ? 'Sign in' : 'Register', [variant]);

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
              <h2 className="text-white text-center text-4xl mb-8 font-semibold">
                {title}
              </h2>
              <div className="flex flex-col gap-4">
                <Input
                  id="name"
                  label="Username"
                  value={name}
                  onChange={(event: { target: { value: SetStateAction<string>; }; }) => setName(event.target.value)}

                  removeFromDOM={variant === FormVariant.CREATE_ACCOUNT}
                />
                <Input
                  id="email"
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(event: { target: { value: SetStateAction<string>; }; }) => setEmail(event.target.value)}
                />
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(event: { target: { value: SetStateAction<string>; }; }) => setPassword(event.target.value)}
                />
              </div>
              <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === FormVariant.LOGIN ? 'Login' : 'Sign up'}
              </button>
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