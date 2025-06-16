import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from '@/components/arrow-left';
import SeeMoreButton from '@/components/see-more-button';
import StaffCardHire from '@/components/staff-card-hire';
import { useAuth } from '@/contexts/auth-context';
import { useLabel } from '@/contexts/label-context';

import type { Staff } from '../../../../backend/api/src/games/get-staff';

export default function HireArtist() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [messageBudget, setMessageBudget] = useState('');
  const navigate = useNavigate();
  const { label, refreshLabel } = useLabel();

  const auth = useAuth();

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

    void fetchStaff();
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
  const labelId = label?.id ?? 0;
  const budget = label?.budget ?? 0;

  return (
    <>
      <ArrowLeft />
      <div className='flex min-h-screen flex-col items-center bg-white py-6'>
        <h1 className='text-secondary w-full text-center text-2xl font-bold underline underline-offset-4'>
          {'HIRE STAFF'}
        </h1>

        <div className='mb-8 w-full text-center text-xl font-medium text-teal-800'>
          {'STAFF'}
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
                  void handleStaffArtist(
                    staff.id,
                    staff.price,
                    labelId,
                    budget,
                  );
                  await navigate('/main-menu');
                  await refreshLabel();
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
    </>
  );
}
