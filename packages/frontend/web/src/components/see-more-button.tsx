import type { PropsWithChildren } from 'react';

type SeeMoreButtonProps = PropsWithChildren<{
  readonly onClick?: () => void;
}>;

function SeeMoreButton({ onClick, children }: SeeMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      type='button'
      className='bg-secondary mt-5 flex h-8 w-25 items-center justify-center rounded-sm text-xl text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
    >
      {children}
    </button>
  );
}

export default SeeMoreButton;
