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
        <div className='sm:flex'>
          <p className='flex items-center font-bold'>
            {label?.notoriety}
            <img
              className='h-6 w-6'
              src='/assets/star-sign.png'
              alt='star sign'
            />
          </p>
          <p className='flex items-center font-bold'>
            {label?.budget}
            <img
              className='mt-0.5 h-5 w-6 pl-1'
              src='/assets/dollar-icon.png'
              alt='dollar sign'
            />
          </p>
        </div>
      </div>
    </div>
  );
}
