import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ErrorForm from '@/components/errors-form';
import Input from '@/components/input';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const passwordCriteria = {
    minLength: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isStrongPassword = Object.values(passwordCriteria).every(Boolean);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    setErrors({});
    setMessage('');

    if (!validateEmail(email)) {
      setErrors({ email: 'Invalid email address' });
      return;
    }

    if (!isStrongPassword) {
      setErrors({ password: 'Password does not meet the criteria' });
      return;
    }

    if (!isAccepted) {
      setErrors({ isAccepted: 'You must accept the privacy policy.' });
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await res.json();

      if (data.ok === false) {
        setMessage('Email is already in use');
      } else {
        setMessage('You can login now');
        setEmail('');
        setPassword('');
        setIsAccepted(false);
        await navigate('/login');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error during registration');
    }
  };

  return (
    <div className='bg-secondary flex min-h-screen flex-col'>
      <div className='flex flex-1 items-center justify-center pr-8 pl-8'>
        <div className='text-primary top-0 z-2 w-full max-w-3xl self-start bg-transparent text-center'>
          <div className='relative top-0 flex flex-col items-center gap-4 text-center'>
            <img
              className='h-32 w-auto md:h-42'
              src='/assets/logo-label.png'
              alt='Logo Label'
            />
            <h1 className='mb-5 text-3xl font-light tracking-wide'>
              {'REGISTER'}
            </h1>
            <form className='w-full max-w-xl' onSubmit={handleRegister}>
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

                <div className='flex items-center gap-2'>
                  <Input
                    id='accepted'
                    type='checkbox'
                    name='accepted'
                    className='accent-orange h-4 w-4'
                    checked={isAccepted}
                    onChange={(event) => {
                      setIsAccepted(event.target.checked);
                    }}
                  />
                  <label htmlFor='accepted' className='text-sm select-none'>
                    {'Please accept the '}
                    <Link
                      to='/privacy-policy'
                      className='hover:text-primary text-orange hover:underline'
                      target='_blank'
                    >
                      {'Privacy Policy'}
                    </Link>
                  </label>
                </div>
                {errors.isAccepted ? (
                  <ErrorForm error={errors.isAccepted} />
                ) : null}
                <Input
                  type='submit'
                  value='Register'
                  name='submit'
                  className='bg-primary hover:text-primary hover:bg-orange w-full self-center !rounded-full text-black transition duration-300 ease-in-out md:w-1/2'
                />
                {message ? (
                  <div className='mt-2 text-center text-sm'>{message}</div>
                ) : null}
                <div className='mt-4 flex flex-col items-center gap-1 text-sm'>
                  <Link
                    to='/login'
                    className='group hover:text-primary hover:underline'
                  >
                    {'Already have an account ? '}
                    <span className='group-hover:text-primary text-orange'>
                      {'Log In'}
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
          {/* Critères de mot de passe */}
          <div className='mt-2'>
            <p
              className={
                passwordCriteria.minLength ? 'text-green-600' : 'text-red-600'
              }
            >
              {passwordCriteria.minLength ? '✅' : '❌'}
              {' Minimum 8 characters'}
            </p>
            <p
              className={
                passwordCriteria.lowercase ? 'text-green-600' : 'text-red-600'
              }
            >
              {passwordCriteria.lowercase ? '✅' : '❌'}{' '}
              {'At least one lowercase letter'}
            </p>
            <p
              className={
                passwordCriteria.uppercase ? 'text-green-600' : 'text-red-600'
              }
            >
              {passwordCriteria.uppercase ? '✅' : '❌'}
              {' At least one uppercase letter'}
            </p>
            <p
              className={
                passwordCriteria.number ? 'text-green-600' : 'text-red-600'
              }
            >
              {passwordCriteria.number ? '✅' : '❌'} {'At least one number'}
            </p>
            <p
              className={
                passwordCriteria.specialChar ? 'text-green-600' : 'text-red-600'
              }
            >
              {passwordCriteria.specialChar ? '✅' : '❌'}{' '}
              {'At least one special character'}
            </p>
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
