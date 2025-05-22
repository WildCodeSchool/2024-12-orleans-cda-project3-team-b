import { useEffect, useState } from 'react';

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
      <div
        className='flex items-center border-r-white pr-4 text-xl sm:border-r-4'
        key={labelInfo?.id}
      >
        <img
          className='max-m-16 mr-2 max-h-16 min-h-10 min-w-10'
          src={`/assets/${labelInfo?.logo_img}`}
          alt="Label's logo"
        />
        <div className='text-sm sm:flex sm:text-xl'>
          <p className='mr-2'>{labelInfo?.name}</p>
          <div className='flex items-center'>
            <p className='font-bold'>{'Level:'}</p>
            <p className='bg-primary mx-2 h-6 w-6 rounded-xs text-center font-bold text-orange-500'>
              {labelInfo?.level ?? 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
