'use client';

import React, { useEffect } from "react";
import { Input } from "@/components/Input";
import { FieldValues, useForm, Resolver } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from "./useLogin";
import { useTranslation } from "@/app/i18n/client";

const validationSchema = yup.object({
  email: yup.string().email().required('login_form.emailRequiredError'),
  password: yup.string()
    .min(4, 'login_form.minPasswordError')
    .required('login_form.passwordRequiredError')
});

const defaultValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues,
    resolver: yupResolver(validationSchema) as unknown as Resolver<FieldValues, any>
  });
  const { loginHandler } = useLogin({ setError });

  useEffect(() => {
    const valueChangeSubscription = watch(() => clearErrors());

    return () => valueChangeSubscription.unsubscribe()
  }, [watch, clearErrors]);

  return (
    <>
      <h2 className="text-white text-center text-4xl mb-8 font-semibold">
        {t('sign_in')}
      </h2>
      <form onSubmit={handleSubmit(loginHandler)}>
        <div className="flex flex-col gap-4">
          <Input
            id="email"
            type="email"
            label={t('login_form.email')}
            register={register}
            error={errors.email?.message && t(`${errors.email?.message}`)}
          />
          <Input
            id="password"
            type="password"
            label={t('login_form.password')}
            register={register}
            error={errors.password?.message && t(`${errors.password?.message}`)}
          />
        </div>
        <div className="relative">
          <span className="absolute text-red-700 text-sm right-0 top-2">
            {!!errors.root?.serverError?.message && t(`${errors.root?.serverError?.message}`)}
          </span>
        </div>
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
          {t('login')}
        </button>
      </form>
    </>
  )
}

export default SignInForm;