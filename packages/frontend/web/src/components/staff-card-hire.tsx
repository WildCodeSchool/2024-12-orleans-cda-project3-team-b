import type { Staff } from '@/pages/hire-staff';

type StaffCardHireProps = {
  readonly staff: Staff;
  readonly onHire: (staffId: number) => void;
  readonly budget: number;
};

export default function staffCardHire({
  staff,
  onHire,
  budget,
}: StaffCardHireProps) {
  const isDisabled = budget < staff.price;

  return (
    <div
      key={staff.id}
      className='bg-secondary flex h-20 w-110 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
    >
      <img
        className='h-16 w-16 rounded-4xl'
        src={`/assets/${staff.image}`}
        alt={`Portrait of ${staff.job}`}
      />
      <div className='flex flex-col items-center'>
        <h2 className='ml-2'>{staff.job}</h2>
        <h3>{`Bonus : ${staff.bonus} %`}</h3>
      </div>

      <div className='flex flex-col items-center'>
        <button
          type='button'
          onClick={() => {
            onHire(staff.id);
          }}
          disabled={isDisabled}
          className={`flex h-8 w-18 items-center justify-center rounded-sm pl-2 text-xl font-bold shadow-[3px_5px_6px_rgba(0,0,0,0.30)] ${
            isDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-orange-500'
          }`}
        >
          {'Hire'}
          <img className='h-7 w-7' src='/assets/sign.png' alt='contract logo' />
        </button>
        <div className='flex items-center'>
          <h2 className='flex items-center font-bold'>{staff.price}</h2>
          <img
            className='mt-0.5 h-3.5 w-3.5'
            src='/assets/dollar-icon.png'
            alt='dollar icon'
          />
        </div>
        {isDisabled ? (
          <p className='mt-1 text-xs text-red-200'>{'Not enough budget'}</p>
        ) : null}
      </div>
    </div>
  );
}
