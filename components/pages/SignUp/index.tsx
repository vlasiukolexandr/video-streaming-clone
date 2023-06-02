'use client';

import React, { useCallback } from "react";
import { Input } from "@/components/Input";
import { ErrorOption, FieldValues, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from "../SignIn/useLogin";
import { useRequests } from "@/hooks/useRequest";

const validationSchema = yup.object({
  name: yup.string().required("Required name"),
  email: yup.string().email().required("Required email"),
  password: yup.string()
    .min(4, 'Password is too short - should be 4 chars minimum.')
    .required("Required password")
});

const defaultValues = {
  email: '',
  password: '',
  name: '',
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const { post } = useRequests();
  const { loginHandler } = useLogin({ setError });

  const signUpHandler = useCallback(async (data: FieldValues) => {
    try {
      await post('/api/register', data);
      loginHandler({ email: data.email, password: data.password });
    } catch (error) {
      console.error(error);
      setError('root.serverError', error as ErrorOption)
    }
  }, [loginHandler, post, setError]);

  return (
    <>
      <h2 className="text-white text-center text-4xl mb-8 font-semibold">
        Register
      </h2>
      <form onSubmit={handleSubmit(signUpHandler)}>
        <div className="flex flex-col gap-4">
          <Input
            id="name"
            label="Username"
            register={register}
            error={errors.name?.message?.toString()}
          />
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
            w-full
            mt-10
            hover:bg-red-700
            transition
          "
        >
          Sign up
        </button>
      </form>
    </>
  )
}

export default SignUpForm;