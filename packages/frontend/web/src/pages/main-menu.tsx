import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AddButton from '@/components/add-button';
import ArtistCardHire from '@/components/artist-card-hire';
import StaffLabelsCard from '@/components/staff-labels-card';

import type { ArtistHired } from '../../../../backend/api/src/artists-hired/artists-hired';
import type { StaffLabel } from '../../../../backend/api/src/games/get-staff-labels';

export default function MainMenu() {
  const [artists, setArtists] = useState<ArtistHired[]>([]);
  const [staff, setStaff] = useState<StaffLabel[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchArtistsHired = async () => {
      try {
        const response = await fetch(`/api/artists-hired`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      }
    };

    const fetchStaff = async () => {
      try {
        const response = await fetch('/api/games/staff-labels');
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setStaff(data.staffLabels);
      } catch (error) {
        console.error('Error fetching staff:', error);
        setStaff([]);
      }
    };

    void fetchArtistsHired();
    void fetchStaff();
  }, []);

  return (
    <div className='bg-primary mx-auto px-4 pt-13 text-center sm:px-8'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-secondary pb-7 text-3xl underline'>
          {'MyARTISTS'}
        </h2>

        <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
          {artists.slice(0, visibleCount).map((artist) => (
            <ArtistCardHire key={artist.id} artist={artist} />
          ))}
        </div>

        <Link to='/my-artists'>
          <button
            type='button'
            className='bg-secondary mt-5 mb-4 flex h-8 w-36 items-center justify-center rounded-sm text-xl text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
          >
            {'See full list'}
          </button>
        </Link>

        <Link to='/hire-artist'>
          <AddButton>{'+'}</AddButton>
        </Link>

        <h2 className='text-secondary pt-1 text-xl'>{'Hire a new artist'}</h2>
      </div>

      {/* RECORD Section */}
      <div className='pt-10'>
        <h2 className='text-secondary text-3xl underline'>{'RECORD'}</h2>

        <div className='mt-6 flex flex-col items-center justify-center gap-8 sm:flex-row'>
          <div className='flex flex-col items-center'>
            <Link to='/create-single'>
              <AddButton>{'+'}</AddButton>
            </Link>
            <h2 className='text-secondary ml-1 text-xl'>{'Create a single'}</h2>
          </div>
          <div className='flex flex-col items-center'>
            <Link to='/create-album'>
              <AddButton>{'+'}</AddButton>
            </Link>
            <h3 className='text-secondary mr-1 pt-1 text-xl'>
              {'Create an album'}
            </h3>
          </div>
        </div>
      </div>

      <div className='h-70'>
        <h2 className='text-secondary text-3xl underline'>{' STAFF'}</h2>

        <div className='mt-5 flex flex-wrap justify-center gap-2'>
          {staff.slice(0, visibleCount).map((staff) => (
            <StaffLabelsCard key={staff.id} staff={staff} />
          ))}
        </div>

        {staff.length <= 3 ? (
          <div className='flex h-30 items-center justify-center'>
            <div className='flex flex-col items-center justify-center pr-2 pl-2'>
              <Link to={'/hire-staff'}>
                <AddButton>{'+'}</AddButton>
              </Link>
              <h3 className='text-secondary text-xl'>{'Hire staff'}</h3>
            </div>
          </div>
        ) : (
          <p>{'You can have only 4 staffs'}</p>
        )}
      </div>
    </div>
  );
}
