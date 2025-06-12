import { Link, useNavigate } from 'react-router-dom';

import Vinyl from '@/components/vinyl';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className='bg-secondary flex min-h-screen flex-col pt-12'>
      <div className='flex flex-1 items-center justify-center pr-8 pl-8'>
        <div className='text-primary top-0 z-2 w-full max-w-3xl self-start bg-transparent'>
          <div className='relative top-0 flex flex-col items-center gap-4 text-center'>
            <div className='flex items-center'>
              <p className='md:text-lg'>
                {` Become the boss of your own music empire!
In this music label management game, you take control of a rising record label. Sign talented artists, produce hit albums, release singles,to dominate the charts. Choose your strategy carefully — will you focus on niche talent, or chase mainstream success?
Your decisions shape the future of your label. Fame, fortune, or failure — it's all in your hands.`}
              </p>
            </div>
            <div className='mt-4 flex flex-col items-center gap-1 text-sm'>
              <button
                type='button'
                className='bg-orange text-primary h-10 w-36 rounded rounded-2xl text-lg shadow-[3px_5px_6px_rgba(0,0,0,0.30)] transition-transform active:scale-95'
                onClick={() => navigate('/login')}
              >
                {'LOG IN'}
              </button>

              <Link
                to='/register'
                className='group hover:text-primary mt-3 hover:underline'
              >
                {' No account yet ? '}
                <span className='group-hover:text-primary text-orange'>
                  {'Sign up'}
                </span>
              </Link>
            </div>
          </div>
        </div>
        <Vinyl />
      </div>
    </div>
  );
}
