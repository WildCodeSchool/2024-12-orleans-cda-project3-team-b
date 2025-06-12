import { useEffect, useState } from 'react';

import Logo from '../../public/assets/logo.png';

type Info = {
  id: number;
  logo_img: string;
  name: string;
  level: number | null;
};
export default function LogoSection() {
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
    <div className='flex flex-wrap gap-4'>
      <div className='flex items-center' key={labelInfo?.id}>
        <img
          className='max-m-16 ml-2 max-h-16 min-h-10 min-w-10'
          src={
            labelInfo?.logo_img != null ? `/assets/${labelInfo.logo_img}` : Logo
          }
          alt="Label's logo"
        />
        <div className='mt-4 h-14 border-r-white pr-4 text-sm sm:flex sm:border-r-4 sm:text-xl md:mt-0'>
          <p className='items-center md:mr-8 md:ml-2 md:flex'>
            {labelInfo?.name}
          </p>
          <div
            className={
              labelInfo?.logo_img != null ? 'flex items-center' : 'hidden'
            }
          >
            <p className='font-bold'>{'Level:'}</p>
            <p className='bg-primary mx-2 h-6 w-6 rounded-xs text-center font-bold text-orange-500'>
              {labelInfo?.level}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
