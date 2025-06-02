import { useEffect, useState } from 'react';

export type Info = {
  id: number;
  notoriety: number;
  budget: number;
};
export default function StatusSection() {
  const [labelInfo, setLabelInfo] = useState<Info>();
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const apiUrl = '/api/games/label';
        const response = await fetch(apiUrl);
        const data = await response.json();

        setLabelInfo(data);
      } catch (error) {
        console.error('Error details:', error);
      }
    };

    void fetchLabels();
  }, []);

  return (
    <div>
      <div
        className={
          labelInfo?.id != null
            ? 'hidden'
            : 'mr-20 flex h-14 items-center border-r-white pr-4 text-xl sm:border-r-4 sm:text-xl'
        }
        key={labelInfo?.id}
      >
        <div className='sm:flex'>
          <p className='flex items-center font-bold'>
            {labelInfo?.notoriety}
            <img
              className='h-6 w-6'
              src='/assets/star-sign.png'
              alt='star sign'
            />
          </p>
          <p className='flex items-center font-bold'>
            {labelInfo?.budget}
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
