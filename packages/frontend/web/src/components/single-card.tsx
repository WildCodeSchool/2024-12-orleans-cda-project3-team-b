type Singles = {
  readonly id: number;
  readonly name: string;
  readonly score: number;
  readonly onToggleSelect: (id: number) => void;
};

export default function SingleCard({
  id,
  name,
  score,
  onToggleSelect,
}: Singles) {
  return (
    <div className='bg-secondary flex h-8 w-64 items-center justify-center rounded-sm px-4 text-white'>
      <div className='text-m flex flex-col items-center font-light'>
        <h2 className='ml-2'>{name}</h2>
      </div>
      <div className='ml-6 flex items-center'>
        <p className='text-m font-bold'>
          {score} {'/100'}
        </p>
      </div>
      <button
        type='button'
        className='mb-5 ml-auto flex items-center text-xl font-extrabold'
        onClick={() => {
          onToggleSelect(id);
        }}
      >
        {'_'}
      </button>
    </div>
  );
}
