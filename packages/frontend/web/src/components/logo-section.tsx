export default function LogoSection() {
  return (
    <div className='flex items-center border-r-white pr-4 text-xl sm:border-r-4'>
      <img
        className='max-m-16 max-h-16 min-h-10 min-w-10'
        src='/assets/orange.png'
        alt="Label's logo"
      />
      <div className='flex flex-col text-sm sm:text-xl'>
        <p className='mr-2'>{'dykhounphypheth'}</p>
        <div className='flex items-center'>
          <p className='font-bold'>{'Level:'}</p>
          <p className='bg-primary mx-2 h-6 w-6 rounded-xs text-center font-bold text-orange-500'>
            {'2'}
          </p>
        </div>
      </div>
    </div>
  );
}
