import type React from 'react';

// This is a reusable, styled input component that accepts all standard input props, applies consistent form styling, and adds a custom orange focus outline for non-checkbox types.

type InputProps = {
  readonly value?: string;
  readonly className?: string;
  readonly onChange?: (event_: React.ChangeEvent<HTMLInputElement>) => void;
  readonly type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = '',
  value,
  onChange,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      className={`border-2 border-gray-300 px-3 py-2 text-sm text-black transition ${props.type !== 'checkbox' ? 'focus:outline-2 focus:outline-offset-2 focus:outline-orange-400' : ''} ${className}`}
    />
  );
}
