import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ErrorForm from '@/components/errors-form';
import Input from '@/components/input';
import { useAuth } from '@/contexts/auth-context';

export default function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    // get info if user is connect and info of him
    if (data.ok === true) {
      auth?.setIsLoggedIn(true);
      auth?.setUser(data.user);
      await navigate('/homepage-game');
    } else {
      setMessage('Invalid login or password');
    }
  };

  return (
    <div className='bg-secondary flex min-h-screen flex-col'>
      <div className='flex flex-1 items-center justify-center pr-8 pl-8'>
        <div className='text-primary top-0 z-2 w-full max-w-3xl self-start bg-transparent'>
          <div className='relative top-0 flex flex-col items-center gap-4 text-center'>
            <img
              className='h-32 w-auto md:h-42'
              src='/assets/logo-label.png'
              alt='Logo Label'
            />
            <h1 className='mb-5 text-3xl font-light tracking-wide'>
              {'LOG IN'}
            </h1>

            <form
              className='w-full max-w-xl'
              onSubmit={(event) => {
                void login(event);
              }}
            >
              <div className='flex flex-col gap-2'>
                <Input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className='bg-primary w-full'
                />

                <Input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className='bg-primary w-full'
                />
              </div>
              {errors.isAccepted ? (
                <ErrorForm error={errors.isAccepted} />
              ) : null}
              <Input
                type='submit'
                value='Log in'
                name='submit'
                className='bg-primary hover:text-primary hover:bg-orange mt-6 w-full self-center !rounded-full text-black transition duration-300 ease-in-out md:w-1/2'
              />
              {message ? (
                <div className='mt-2 text-center text-sm text-red-600'>
                  {message}
                </div>
              ) : null}

              <div className='mt-4 flex flex-col items-center gap-1 text-sm'>
                <Link
                  to='/register'
                  className='group hover:text-primary hover:underline'
                >
                  {' No account yet ? '}
                  <span className='group-hover:text-primary text-orange'>
                    {'Sign up'}
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <img
          className='lg:w-1xl pointer-events-none fixed right-0 bottom-0 w-md md:w-xl'
          src='/assets/vinyl.png'
          alt='Vinyle'
        />
      </div>
    </div>
  );
}
