import type React from 'react';

type InputProps = {
  readonly value?: string;
  readonly className?: string;
  readonly onChange?: (event_: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className = '', value, onChange, ...props }: InputProps) => {
  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      /* eslint-disable react/prop-types */
      className={`border-2 border-gray-300 bg-white px-3 py-2 text-sm text-black transition ${props.type !== 'checkbox' ? 'focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-details)]' : ''} ${className}`}
    />
  );
};

export default Input;
