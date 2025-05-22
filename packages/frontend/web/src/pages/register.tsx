import type { FormEvent } from 'react';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const regex = {
    minLength: password.length >= 15,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isStrongPassword = Object.values(regex).every(Boolean);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const login = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setMessage('Email invalid');
      return;
    }

    if (!isStrongPassword) {
      setMessage('Low password');
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
      }
    } catch (error) {
      console.error(error);
      setMessage('Error during registration');
    }
  };

  return (
    <>
      <form
        onSubmit={async (event) => {
          await login(event);
        }}
      >
        <label htmlFor='email' />
        <input
          type='email'
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className='bg-amber-300'
          placeholder='Email'
        />
        <label htmlFor='password' />
        <input
          type='password'
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className='bg-amber-300'
          placeholder='Password'
        />
        <button type='submit' className='rounded-md bg-gray-500 text-center'>
          {'Register'}
        </button>
        {message ? <p className='mt-2 text-sm'>{message}</p> : null}
      </form>

      {/* Critères de mot de passe */}
      <div className='mt-4 text-sm'>
        <p className={regex.minLength ? 'text-green-600' : 'text-red-600'}>
          {regex.minLength ? '✅' : '❌'} {'Minimum 15 characters'}
        </p>
        <p className={regex.lowercase ? 'text-green-600' : 'text-red-600'}>
          {regex.lowercase ? '✅' : '❌'} {'At least one lowercase letter'}
        </p>
        <p className={regex.uppercase ? 'text-green-600' : 'text-red-600'}>
          {regex.uppercase ? '✅' : '❌'} {'At least one uppercase letter'}
        </p>
        <p className={regex.number ? 'text-green-600' : 'text-red-600'}>
          {regex.number ? '✅' : '❌'} {'At least one number'}
        </p>
        <p className={regex.specialChar ? 'text-green-600' : 'text-red-600'}>
          {regex.specialChar ? '✅' : '❌'} {'At least one special character'}
        </p>
      </div>
    </>
  );
}
