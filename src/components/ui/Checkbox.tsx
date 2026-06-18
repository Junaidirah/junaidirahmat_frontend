import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, ...props }, ref) => {
    return (
      <div className="items-top flex space-x-2">
        <input
          type="checkbox"
          className={`peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 focus:ring-2 focus:ring-[#2d7a9c] disabled:cursor-not-allowed disabled:opacity-50 accent-[#2d7a9c] transition-colors mt-0.5 ${
            error ? 'border-red-500' : ''
          } ${className || ''}`}
          ref={ref}
          {...props}
        />
        {/* Label and description container */}
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={props.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
