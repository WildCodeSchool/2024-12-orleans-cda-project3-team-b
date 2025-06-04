import type { Staff } from '@/pages/hire-staff';

type StaffCardProps = {
  readonly staf: Staff;
};

export default function StaffLabelsCard({ staf }: StaffCardProps) {
  const handleClick = async () => {
    await fetch('/api/games/delete-staff', {
      method: 'POST',
      body: JSON.stringify({
        staffId: staf.id,
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  };

  return (
    <div className='bg-secondary flex h-10 w-35 items-center justify-between gap-2 rounded-sm p-2 text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)] sm:h-12 sm:w-50 sm:flex-row sm:gap-0 md:w-50'>
      <img
        className='h-8 w-8 rounded-4xl md:h-10 md:w-10'
        src={`/assets/${staf.image}`}
        alt=''
      />
      <div className='flex-col items-center text-sm'>
        <button type='button' onClick={handleClick}>
          {'delete'}
        </button>
        <h3>{`${staf.bonus} %`}</h3>
      </div>
    </div>
  );
}
