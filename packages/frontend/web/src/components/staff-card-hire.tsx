import type { Staff } from '../../../../backend/api/src/games/get-staff';

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
      className='bg-secondary flex h-14 w-70 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)] md:h-20 md:w-110'
    >
      <img
        className='h-10 w-10 rounded-4xl md:h-16 md:w-16'
        src={`/assets/${staff.image}`}
        alt={`Portrait of ${staff.job}`}
      />
      <div className='flex flex-col items-center'>
        <h2 className='ml-2 text-sm md:text-xl'>{staff.job}</h2>
        <h3 className='text-sm md:text-xl'>{`Bonus : ${staff.bonus} %`}</h3>
      </div>

      <div className='flex flex-col items-center'>
        <button
          type='button'
          onClick={() => {
            onHire(staff.id);
          }}
          disabled={isDisabled}
          className={`flex h-5 w-12 items-center justify-center rounded-sm pl-2 text-sm font-bold shadow-[3px_5px_6px_rgba(0,0,0,0.30)] md:h-8 md:w-18 md:text-xl ${
            isDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-orange-500'
          }`}
        >
          {'Hire'}
          <img
            className='mr-0.5 h-5 md:mr-0 md:h-7 md:w-7'
            src='/assets/sign.png'
            alt='contract logo'
          />
        </button>
        <div className='flex items-center'>
          <h2 className='flex items-center text-sm font-bold md:text-xl'>
            {staff.price}
          </h2>
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
