import AddButton from '@/components/add-button';
import { ArrowLeft } from '@/components/arrow-left';
import ChooseName from '@/components/choose-name';
import VerifyButton from '@/components/verify-button';

export default function CreateSingle() {
  return (
    <form action='' method='post'>
      <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6'>
        <div className='mb-4 flex w-full items-center justify-between'>
          <button type='button'>
            <ArrowLeft />
          </button>
          <h1 className='text-secondary text-center text-2xl font-bold'>
            {'RECORDING A NEW SINGLE'}
          </h1>
          <div className='h-6 w-6' />
        </div>
        <img className='h-18 w-18' src='/assets/music-note.png' alt='' />
        <div className='flex flex-col items-center justify-center'>
          <ChooseName
            name={"Choose your single's Name"}
            placeholder={"single's Name"}
          />
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
    </form>
  );
}
