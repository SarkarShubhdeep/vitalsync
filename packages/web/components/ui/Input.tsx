'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-bold uppercase tracking-wider">{label}</label>}
      <input
        className={`
          flex h-10 w-full border-2 border-black bg-white px-3 py-2 text-sm 
          placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};
