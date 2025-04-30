import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type Artist = {
  artist_id: number;
  firstname: string;
  lastname: string;
  alias: string;
  image: string;
  genre_name: string;
  notoriety: number;
  price: number;
};

const publicKey = import.meta.env.VITE_API_URL;

export default function HireArtist() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const apiUrl = `${publicKey}/artists`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setArtists(data);
      } catch (error) {
        console.error('Error details:', error);
        setArtists([]); // Reset artists on error
      }
    };

    void fetchArtists();
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };
  const sortedArtists = [...artists].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
  );

  const handleHireArtist = async (artistId: number) => {
    // event.preventDefault()
    try {
      // Step 1: Fetch existing hired artists
      const existingResponse = await fetch(`${publicKey}/artists-hired`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!existingResponse.ok) {
        throw new Error(
          `Failed to fetch existing hired artists. Status: ${existingResponse.status}`,
        );
      }

      const hiredArtists = await existingResponse.json();
      console.log('Hired artists:', hiredArtists);

      // Step 2: Check if artist is already hired
      const isAlreadyHired = hiredArtists.some(
        (artist: { artists_id: number }) => artist.artists_id === artistId,
      );
      console.log('Is already hired:', isAlreadyHired);

      if (isAlreadyHired) {
        alert('This artist is already hired.');
        console.log('This artist is already hired.');
        return;
      } else {
        const response = await fetch(`${publicKey}/artists-hired`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ artistId }),
        });
        console.log(artistId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Hire successful:', result);
        alert('Artist hired successfully!');
        return;
      }
    } catch (error) {
      console.error('Error hiring artist:', error);
      alert('Failed to hire artist.');
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center bg-white px-4 py-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <button
          onClick={async () => {
            await navigate(-1);
          }}
          type='button'
          className='text-secondary hover:text-orange-500'
        >
          <img
            src='/assets/arrow-left.png'
            alt='arrow left'
            className='W-10 h-10'
          />
        </button>
        <h1 className='text-secondary text-center text-2xl font-bold underline underline-offset-4'>
          {'HIRE ARTISTS'}
        </h1>
        <div className='h-6 w-6' />
      </div>

      <div className='mb-8 flex flex-col text-xl font-medium text-teal-800'>
        {'ARTISTS'}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {sortedArtists.slice(0, visibleCount).map((artist) => {
          console.log(artist);
          return (
            <div
              key={artist.artist_id}
              className='bg-secondary flex h-20 w-110 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
            >
              <img
                className='h-16 w-16 rounded-4xl'
                src={`/assets/${artist.image}`}
                alt=''
              />
              <span className='flex flex-col items-center'>
                <h2 className='ml-2'>
                  {artist.firstname} {artist.lastname} {artist.alias}
                </h2>
                <h3>{artist.genre_name}</h3>
              </span>
              <span className='flex items-center'>
                <h2 className='flex items-center font-bold'>
                  {artist.notoriety}
                </h2>
                <img
                  className='mt-0.5 h-5 w-5'
                  src='/assets/star-sign.png'
                  alt=''
                />
              </span>
              <span className='flex flex-col items-center'>
                <button
                  key={artist.artist_id}
                  type='button'
                  onClick={(event) => handleHireArtist(artist.artist_id)}
                  className='flex h-8 w-18 items-center justify-center rounded-sm bg-orange-500 pl-2 text-xl font-bold shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
                >
                  {' Hire '}
                  <img
                    className='h-7 w-7'
                    src='/assets/sign.png'
                    alt='contract logo'
                  />
                </button>

                <span className='flex items-center'>
                  <h2 className='flex items-center font-bold'>
                    {artist.price}
                  </h2>
                  <img
                    className='mt-0.5 h-3.5 w-3.5'
                    src='/assets/dollar-icon.png'
                    alt=''
                  />
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleSeeMore}
        type='button'
        className='bg-secondary mt-5 flex h-8 w-25 items-center justify-center rounded-sm text-xl text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
      >
        {'See More'}
      </button>
    </div>
  );
}
