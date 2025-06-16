import type { Marketing } from '../../../../backend/api/src/marketing/marketing';

type MarketingCardProps = {
  readonly marketing: Marketing;
  readonly budget: number;
  readonly price?: number;
  readonly onClick?: () => void;
};

export default function MarketingCard({
  marketing,
  budget,
  price,
  onClick,
}: MarketingCardProps) {
  const isDisabled = budget < marketing.price + (price ?? 0);

  return (
    <button
      type='button'
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={`${
        isDisabled
          ? 'cursor-not-allowed bg-gray-400'
          : 'bg-secondary cursor-pointer'
      } flex h-14 w-76 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]`}
      title={
        isDisabled ? 'Not enough budget to select this marketing campaign' : ''
      }
    >
      <img
        className='h-10 w-10 rounded-4xl'
        src={`/assets/${marketing.image}`}
        alt=''
      />
      <div className='flex flex-col items-center text-sm'>
        <h2 className='ml-2'>{marketing.name}</h2>
        <h3 className='font-extralight'>{marketing.bonus}</h3>
      </div>
      <div className='flex items-center'>
        <p className='text-sm font-bold'>{marketing.price}</p>
        <img
          className='mt-0.5 h-3.5 w-3.5'
          src='/assets/dollar-icon.png'
          alt='dollar icon'
        />
      </div>
    </button>
  );
}
