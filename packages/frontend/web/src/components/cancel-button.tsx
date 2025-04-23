import type { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  readonly onClick?: () => void;
}>;

function CancelButton({ onClick }: ButtonProps) {
  return (
    <div className='bg-secondary mx-auto flex h-9 w-26 items-center justify-center rounded-sm shadow-[1px_2px_6px_rgba(0,0,0,0.30)]'>
      <button
        type={'button'}
        onClick={onClick}
        className={`flex h-11 items-center justify-center pb-2 text-xl text-white`}
      >
        {'Cancel'}
        <img
          className='mt-1 ml-1 flex items-center'
          src='/assets/not-check.png'
          alt=''
        />
      </button>
    </div>
  );
}

export default CancelButton;
