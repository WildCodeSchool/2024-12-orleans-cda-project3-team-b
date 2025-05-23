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
    <div className='flex flex-col'>
      <div className='bg-secondary flex w-20 items-center justify-center rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'>
        <img
          className='h-10 w-10 rounded-4xl'
          src={`/assets/${staf.image}`}
          alt=''
        />
        <div className='flex flex-col items-center text-sm'>
          <h3>{`${staf.bonus} %`}</h3>
        </div>
        <button type='button' onClick={handleClick}>
          {'delete'}
        </button>
      </div>
    </div>
  );
}
