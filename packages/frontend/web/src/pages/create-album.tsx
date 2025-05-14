import { useNavigate } from 'react-router';

import AddButton from '@/components/add-button';
import AddSingle from '@/components/add-single';
import ChooseName from '@/components/choose-name';
import RemoveSingle from '@/components/remove-single';
import VerifyButton from '@/components/verify-button';

export default function CreateAlbum() {
  const navigate = useNavigate();
  return (
    <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <button
          type='button'
          className='text-secondary hover:text-orange-500'
          onClick={async () => {
            await navigate(-1);
          }}
        >
          <img
            src='/assets/arrow-left.png'
            alt='arrow left'
            className='W-10 h-10'
          />
        </button>
        <h1 className='text-secondary text-center text-2xl font-bold'>
          {'RECORDING A NEW ALBUM'}
        </h1>
        <div className='h-6 w-6' />
      </div>
      <img className='h-22 w-22' src='/assets/album.png' alt='' />
      <div className='flex flex-col items-center justify-center'>
        <ChooseName
          name={"Choose your album's name"}
          placeholder={"Album's name"}
        />
      </div>
      <div className='mt-12 flex w-full flex-col items-center gap-2'>
        <RemoveSingle />
        <AddSingle />
        <AddSingle />
      </div>
      <div className='mt-12 flex w-full flex-col items-center justify-between'>
        <AddButton>{'+'}</AddButton>
        <h2 className='text-secondary mt-1 text-center text-xl'>
          {'MARKETING CAMPAIGN'}
        </h2>
      </div>
      <div className='mt-12 flex items-center justify-between gap-x-16'>
        <VerifyButton color='bg-secondary' image='/assets/not-check.png'>
          {'Cancel'}
        </VerifyButton>
        <VerifyButton color='bg-orange-500' image='/assets/check.png'>
          {'Confirm'}
        </VerifyButton>
      </div>
    </div>
  );
}
