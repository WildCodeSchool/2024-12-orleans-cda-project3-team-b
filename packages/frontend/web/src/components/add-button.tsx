import type { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  readonly onClick?: () => void;
  readonly disabled?: boolean;
}>;

function AddButton({ onClick, children, disabled = false }: ButtonProps) {
  return (
    <div className='bg-secondary flex h-9 w-10 items-center justify-center rounded-xl shadow-[3px_5px_6px_rgba(0,0,0,0.30)] inset-ring-2 inset-ring-white'>
      <button
        type={'button'}
        onClick={onClick}
        disabled={disabled}
        className={`flex h-11 flex-col items-center justify-center pb-2 text-3xl text-white ${
          disabled ? 'opacity-50' : ''
        }`}
      >
        {children}
      </button>
    </div>
  );
}

export default AddButton;
