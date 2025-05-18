import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

type Info = {
  id: number;
  logo_img: string;
  name: string;
  level: number;
  notoriety: number;
  budget: number;
};
export default function StatusSection() {
  const [labelInfo, setLabelInfo] = useState<Info[]>([]);
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const apiUrl = `${API_URL}/games/label`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setLabelInfo(data.result);
      } catch (error) {
        console.error('Error details:', error);
        setLabelInfo([]);
      }
    };

    void fetchLabels();
  }, []);
  console.log(labelInfo);

  return (
    <div>
      {labelInfo.map((info) => (
        <div
          className='mr-20 border-r-white pr-4 text-sm sm:border-r-4 sm:text-xl'
          key={info.id}
        >
          <div className='sm:flex'>
            <p className='flex items-center font-bold'>
              {info.notoriety}
              <img
                className='h-6 w-6'
                src='/assets/star-sign.png'
                alt='star sign'
              />
            </p>
            <p className='flex items-center font-bold'>
              {info.budget}
              <img
                className='mt-0.5 h-5 w-6 pl-1'
                src='/assets/dollar-icon.png'
                alt='dollar sign'
              />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
