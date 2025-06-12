// import { useEffect, useState } from 'react';
import { useLabel } from '@/contexts/label-context';

import Logo from '../../public/assets/logo.png';

export default function LogoSection() {
  const { label } = useLabel();

  return (
    <div className='flex flex-wrap gap-4'>
      <div className='flex items-center' key={label?.id}>
        <img
          className='max-m-16 mr- ml-2 max-h-16 min-h-10 min-w-10'
          src={label?.logo_img != null ? `/assets/${label.logo_img}` : Logo}
          alt="Label's logo"
        />
        <div className='h-14 border-r-white pr-4 text-sm sm:flex sm:border-r-4 sm:text-xl'>
          <p className='mr-2'>{label?.name}</p>
          <div
            className={label?.logo_img != null ? 'flex items-center' : 'hidden'}
          >
            <p className='text-sm font-bold md:text-xl'>{'Level:'}</p>
            <p className='bg-primary mx-2 h-5 w-5 rounded-xs text-center font-bold text-orange-500 md:h-6 md:w-6'>
              {label?.level}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
