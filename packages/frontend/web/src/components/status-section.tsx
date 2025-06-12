import { useLabel } from '@/contexts/label-context';

export default function StatusSection() {
  const { label } = useLabel();

  return (
    <div>
      <div
        className={
          label?.id != null
            ? 'mr-20 flex h-14 items-center border-r-white pr-4 text-xl sm:border-r-4 sm:text-xl'
            : 'hidden'
        }
        key={label?.id}
      >
        <div className='text-sm sm:flex md:text-xl'>
          <p className='flex items-center font-bold'>
            {label?.notoriety}
            <img
              className='mt-0.5 h-4 md:h-6 md:w-6'
              src='/assets/star-sign.png'
              alt='star sign'
            />
          </p>
          <p className='flex items-center font-bold'>
            {label?.budget}
            <img
              className='h-3 md:mt-0.5 md:h-5 md:w-6 md:pl-1'
              src='/assets/dollar-icon.png'
              alt='dollar sign'
            />
          </p>
        </div>
      </div>
    </div>
  );
}
