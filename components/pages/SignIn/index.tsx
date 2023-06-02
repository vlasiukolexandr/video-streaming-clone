'use client';

import React from "react";
import { Input } from "@/components/Input";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from "./useLogin";

const validationSchema = yup.object({
  email: yup.string().email().required("Required email"),
  password: yup.string()
    .min(4, 'Password is too short - should be 4 chars minimum.')
    .required("Required password")
});

const defaultValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const { loginHandler } = useLogin({ setError });

  return (
    <>
      <h2 className="text-white text-center text-4xl mb-8 font-semibold">
        Sign in
      </h2>
      <form onSubmit={handleSubmit(loginHandler)}>
        <div className="flex flex-col gap-4">
          <Input
            id="email"
            type="email"
            label="Email"
            register={register}
            error={errors.email?.message?.toString()}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            register={register}
            error={errors.password?.message?.toString()}
          />
        </div>
        <p className="text-red-700 text-sm">{errors.root?.serverError?.message?.toString()}</p>
        <button
          type="submit"
          className="
            bg-red-600
            py-3
            text-white
            rounded-md
            w-full mt-10
            hover:bg-red-700
            transition
          "
        >
          Login
        </button>
      </form>
    </>
  )
}

export default SignInForm;