import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
type Labels = {
  budget: number;
  id: number;
  levels_id: number;
  logos_id: number;
  name: string;
  notoriety: number;
  score_xp: number;
};
export default function LogoSection() {
  const [labels, setLabels] = useState<Labels[]>([]);
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const apiUrl = `${API_URL}/games/labels`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setLabels(data);
      } catch (error) {
        console.error('Error details:', error);
        setLabels([]);
      }
    };

    void fetchLabels();
  }, []);
  return (
    <div className='flex flex-wrap gap-4'>
      {labels.map((label) => (
        <div
          className='flex items-center border-r-white pr-4 text-xl sm:border-r-4'
          key={label.id}
        >
          <img
            className='max-m-16 max-h-16 min-h-10 min-w-10'
            src={`${label.logos_id}`}
            alt="Label's logo"
          />
          <div className='text-sm sm:flex sm:text-xl'>
            <p className='mr-2'>{label.name}</p>
            <div className='flex items-center'>
              <p className='font-bold'>{'Level:'}</p>
              <p className='bg-primary mx-2 h-6 w-6 rounded-xs text-center font-bold text-orange-500'>
                {label.levels_id}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
