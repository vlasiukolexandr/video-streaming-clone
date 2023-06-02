import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  error?: string;

  register?: UseFormRegister<FieldValues>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  error,

  register
}) => {
  return (
    <div className="relative">
      <input 
        id={id}
        type={type}
        {...register?.(id)}
        className="
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
          text-white
          bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
        "
        placeholder=" "
      />
      <label
        className="
          absolute
          text-md
          text-zinc-400
          duration-150
          transform
          -translate-y-3
          scale-75
          top-4
          z-10
          origin-[0]
          left-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
        "
        htmlFor={id}
      >
        {label}
      </label>
      {!!error && <p className="text-red-700 text-sm">{error}</p>}
    </div>
  )
}

export { Input }