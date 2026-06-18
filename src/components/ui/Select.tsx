import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <label className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <select
          className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2d7a9c] disabled:cursor-not-allowed disabled:opacity-50 transition-colors appearance-none ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          } ${className || ''}`}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-slate-500">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-slate-900 dark:text-slate-100 dark:bg-slate-800">
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
