'use client';

import { ButtonHTMLAttributes } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function Button({ loading = false, className = '', disabled, children, ...props }: Props) {
  return (
    <button
      className={`w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:bg-emerald-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoadingSpinner /> : null}
      {children}
    </button>
  );
}
