import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from '@/components/arrow-left';
import SeeMoreButton from '@/components/see-more-button';
import StaffCardHire from '@/components/staff-card-hire';
import { useAuth } from '@/contexts/auth-context';

import type { Staff } from '../../../../backend/api/src/games/get-staff';

export type InfoLabel = {
  label: number;
  budget: number;
};

export default function HireArtist() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [infoLabel, setInfoLabel] = useState<InfoLabel | null>(null);
  const [messageBudget, setMessageBudget] = useState('');
  const navigate = useNavigate();

  const auth = useAuth();
  const labelId = infoLabel?.label;
  const budget = infoLabel?.budget ?? 0;

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const apiUrl = '/api/games/staff';

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setStaff(data.staff);
      } catch (error) {
        console.error('Error details:', error);
        setStaff([]);
      }
    };

    const fetchInfoLabel = async () => {
      try {
        const res = await fetch('/api/games/label');
        const data = await res.json();
        setInfoLabel(data);
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };
    void fetchStaff();
    void fetchInfoLabel();
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };
  const sortedStaff = [...staff].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
  );

  const handleStaffArtist = async (
    staffId: number,
    price: number,
    labelId: number,
    budget: number,
  ) => {
    try {
      const userId = auth?.user?.id;
      const staffResponse = await fetch('/api/games/staff-hire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId,
          cost: price,
          labelId,
          budget,
          userId,
        }),
      });

      if (!staffResponse.ok) {
        throw new Error(`Hire failed. Status: ${staffResponse.status}`);
      }

      setStaff((prev) => prev.filter((staff) => staff.id !== staffId));
    } catch (error) {
      console.error('Error hiring artist:', error);
    }
  };

  return (
    <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <button type='button'>
          <ArrowLeft />
        </button>
        <h1 className='text-secondary text-center text-2xl font-bold underline underline-offset-4'>
          {'HIRE STAFF'}
        </h1>
        <div className='h-6 w-6' />
      </div>

      <div className='mb-8 flex flex-col text-xl font-medium text-teal-800'>
        {'STAFF'}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {sortedStaff.slice(0, visibleCount).map((staff) => (
          <StaffCardHire
            key={staff.id}
            staff={staff}
            onHire={async () => {
              if (labelId === undefined) {
                setMessageBudget('Label or budget info not loaded yet.');
                return;
              }
              try {
                void handleStaffArtist(staff.id, staff.price, labelId, budget);
                await navigate('/main-menu');
              } catch {
                setMessageBudget('redirection not working');
              }
            }}
            budget={budget}
          />
        ))}
      </div>
      <SeeMoreButton onClick={handleSeeMore}> {'See More'}</SeeMoreButton>

      {messageBudget ? (
        <div className='mb-4 text-sm font-medium text-red-600'>
          {messageBudget}
        </div>
      ) : null}
    </div>
  );
}
