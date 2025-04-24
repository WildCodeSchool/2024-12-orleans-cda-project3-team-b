import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorForm from '@/components/error';
import Header from '@/components/header';
import Input from '@/components/input';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isAcceptpp, setIsAcceptpp] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3 || username.length > 15) {
      newErrors.username = 'The username must be between 3 and 15 characters.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username =
        'The username can only contain letters, numbers, and underscores.';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (
      !/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/.test(
        password,
      )
    ) {
      newErrors.password =
        'The password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    if (!isAcceptpp) {
      newErrors.isAcceptpp = 'Please accept the Privacy Policy to continue.';
    }

    return newErrors;
  };

  const handleSubmit = (event_: React.FormEvent) => {
    event_.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', { email, password, username, isAcceptpp });
    }
  };

  return (
    <div className='bg-secondary flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1 items-center justify-center p-8'>
        <div className='relative z-2 w-full max-w-3xl bg-transparent text-white'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <img
              className='h-32 w-auto md:h-42'
              src='/assets/logo-label.png'
              alt='Logo Label'
            />
            <h1 className='mb-5 text-3xl font-light tracking-wide'>
              {'SIGN IN'}
            </h1>
            <form className='w-full max-w-xl' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                <Input
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={username}
                  onChange={(event_) => {
                    setUsername(event_.target.value);
                  }}
                  className='w-full'
                />
                {errors.username ? <ErrorForm error={errors.username} /> : null}

                <Input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={(event_) => {
                    setEmail(event_.target.value);
                  }}
                  className='w-full'
                />
                {errors.email ? <ErrorForm error={errors.email} /> : null}

                <Input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={(event_) => {
                    setPassword(event_.target.value);
                  }}
                  className='w-full'
                />
                {errors.password ? <ErrorForm error={errors.password} /> : null}

                <div className='flex items-center gap-2'>
                  <Input
                    id='acceptpp'
                    type='checkbox'
                    name='acceptpp'
                    className='h-4 w-4 accent-[var(--color-orange)]'
                    checked={isAcceptpp}
                    onChange={(event_) => {
                      setIsAcceptpp(event_.target.checked);
                    }}
                  />
                  <label htmlFor='acceptpp' className='text-sm select-none'>
                    {'Please accept the'}{' '}
                    <Link
                      to='/privacy-policy'
                      className='text-[var(--color-orange)] hover:text-white hover:underline'
                      target='_blank'
                    >
                      {'Privacy Policy'}
                    </Link>
                  </label>
                </div>
                {errors.isAcceptpp ? (
                  <ErrorForm error={errors.isAcceptpp} />
                ) : null}

                <Input
                  type='submit'
                  value='Sign In'
                  name='submit'
                  className='w-full self-center !rounded-full bg-white text-black transition duration-300 ease-in-out hover:bg-[var(--color-orange)] hover:text-white md:w-1/2'
                />

                <div className='mt-4 flex flex-col items-center gap-1 text-sm'>
                  <Link to='/recovery-password' className='hover:underline'>
                    {'Forgotten password ?'}
                  </Link>
                  <Link
                    to='/sign-in'
                    className='group hover:text-white hover:underline'
                  >
                    {'Already have an account ?'}{' '}
                    <span className='text-[var(--color-orange)] group-hover:text-white'>
                      {' '}
                      {'Sign In'}
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <img
          className='pointer-events-none fixed right-0 bottom-0 w-md md:w-xl lg:w-2xl'
          src='/assets/vinyl.png'
          alt='Vinyle'
        />
      </div>
    </div>
  );
}
