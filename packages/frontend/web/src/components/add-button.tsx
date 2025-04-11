import type { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  readonly onClick?: () => void;
}>;

function AddButton({ onClick, children }: ButtonProps) {
  return (
    <div className='bg-secondary mx-auto flex h-13 w-14 items-center justify-center rounded-xl shadow-[3px_5px_6px_rgba(0,0,0,0.30)] inset-ring-2 inset-ring-white'>
      <button
        type={'button'}
        onClick={onClick}
        className={`flex h-11 flex-col items-center justify-center pb-3 text-6xl text-white`}
      >
        {children}
      </button>
    </div>
  );
}

export default AddButton;
