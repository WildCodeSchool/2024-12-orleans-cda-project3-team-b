type RemoveSingleProps = {
  readonly onClick?: () => void;
};

function RemoveSingle({ onClick }: RemoveSingleProps) {
  return (
    <div className='bg-primaryColor mx-auto flex h-8 w-64 items-center justify-center rounded-sm'>
      <h2 className='mx-11 flex text-center text-xl text-white'>
        {"single's name"}
      </h2>
      <button
        type={'button'}
        onClick={onClick}
        className='mb-1 flex items-center text-3xl font-bold text-white'
      >
        {'–'}
      </button>
    </div>
  );
}

export default RemoveSingle;
