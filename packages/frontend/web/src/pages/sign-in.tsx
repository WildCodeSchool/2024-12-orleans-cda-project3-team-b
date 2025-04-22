import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorForm from '@/components/error';
import Input from '@/components/input';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isAcceptpp, setIsAcceptpp] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Incorrect email';
    }

    if (!username) {
      newErrors.username = 'Username required';
    } else if (username.length < 3 || username.length > 15) {
      newErrors.username = 'Username must be between 3 and 15 characters.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username =
        'Caractères non autorisés dans le nom (lettres, chiffres, _ uniquement).';
    }

    if (!password) {
      newErrors.password = 'Mot de passe requis';
    } else if (
      !/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/.test(
        password,
      )
    ) {
      newErrors.password =
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.';
    }

    if (!agreepp) {
      newErrors.agreepp = 'Vous devez accepter la politique de confidentialité';
    }
    return newErrors;
  };

  const handleSubmit = (event_) => {
    event_.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', { email, password, username, isAcceptpp });
    }
  };

  return (
    <div className='bg-secondary flex h-screen flex-col gap-4'>
      <div className='header h-30 bg-red-500'>
        <p>{'test'}</p>
      </div>
      <div className='flex h-screen items-center justify-center text-white'>
        <div className='absolute top-1/2 left-90 -translate-y-1/2'>
          <img
            className='h-full w-auto'
            src='/assets/logo-label.png'
            alt='Logo Label'
          />
        </div>
        <div className='z-10 flex flex-col items-center justify-center gap-4'>
          <h1 className='font-inter mb-5 text-3xl font-light tracking-wide'>
            {'INSCRIPTION'}
          </h1>
          <form className='w-4xl'>
            <div className='mb-5 flex w-full flex-col items-center gap-4'>
              <Input
                type='text'
                placeholder='Username'
                name='username'
                value={username}
                onChange={(event_) => {
                  setUsername(event_.target.value);
                }}
                className='w-1/2'
                required
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
                className='w-1/2'
                required
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
                className='w-1/2'
                required
              />
              {errors.password ? <ErrorForm error={errors.password} /> : null}
            </div>
            <div className='flex w-full flex-col items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Input
                  id='acceptpp'
                  type='checkbox'
                  name='agreepp'
                  className='ml-2 h-4 w-4 accent-[var(--color-details)]'
                  checked={isAcceptpp}
                  onChange={(event_) => {
                    setIsAcceptpp(event_.target.checked);
                  }}
                  required
                />
                <label htmlFor='acceptpp' className='text-white'>
                  {'Agree to the Privacy Policy'}
                </label>
              </div>
              {errors.isAcceptpp ? (
                <ErrorForm error={errors.isAcceptpp} />
              ) : null}

              <Input
                type='submit'
                value='Sign In'
                name='submit'
                className='w-1/2 !rounded-full bg-white text-black'
                onClick={handleSubmit}
              />
              <div className='flex flex-col items-center gap-1'>
                <Link
                  to='/recovery-password'
                  className='text-white hover:underline'
                >
                  {'Forgot Password?'}
                </Link>
                <Link to='/sign-in' className='text-white hover:underline'>
                  {'Already have an account ?'}
                  <span className='text-[var(--color-details)] hover:text-white'>
                    {' '}
                    {'Sign In'}
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className='absolute right-0 bottom-0 z-[1]'>
          <img
            className='h-auto w-4xl'
            src='/assets/vinyl.png'
            alt='Logo Label'
          />
        </div>
      </div>
    </div>
  );
}
