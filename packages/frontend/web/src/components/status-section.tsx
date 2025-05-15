export default function StatusSection() {
  return (
    <div className='mr-20 border-r-white pr-4 text-sm sm:border-r-4 sm:text-xl'>
      <div className='sm:flex'>
        <p className='flex items-center font-bold'>
          {'3,2'}
          <img
            className='h-6 w-6'
            src='/assets/star-sign.png'
            alt='star sign'
          />
        </p>
        <p className='flex items-center font-bold'>
          {'50,000'}
          <img
            className='mt-0.5 h-5 w-6 pl-1'
            src='/assets/dollar-icon.png'
            alt='dollar sign'
          />
        </p>
      </div>
    </div>
  );
}
