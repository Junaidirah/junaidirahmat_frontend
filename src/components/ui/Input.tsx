import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <label className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <input
          className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2d7a9c] disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          } ${className || ''}`}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
