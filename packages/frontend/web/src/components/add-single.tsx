type AddSingleProps = {
  readonly onClick?: () => void;
};

function AddSingle({ onClick }: AddSingleProps) {
  return (
    <div className='flex h-8 w-64 items-center justify-center rounded-sm bg-orange-500 px-4'>
      <h2 className='mx-auto flex text-center text-xl text-white'>
        {'add single'}
      </h2>
      <button
        type={'button'}
        onClick={onClick}
        className='mb-1 flex items-center text-3xl font-bold text-white'
      >
        {'+'}
      </button>
    </div>
  );
}

export default AddSingle;
