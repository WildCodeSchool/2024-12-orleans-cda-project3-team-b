import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await res.json();

    if (data.key === true) {
      auth?.setIsLoggedIn(true);
      await navigate('/homepage-game');
    } else {
      setMessage('Invalid login or password');
    }
  };

  return (
    <form
      onSubmit={(event) => {
        void login(event);
      }}
    >
      <label htmlFor='email'>{'Email'}</label>
      <input
        type='email'
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        className='bg-amber-300'
        placeholder='Email'
      />
      <label htmlFor='password'>{'Password'}</label>
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
        {'Log in\r'}
      </button>
      {message ? (
        <p className='text-center text-sm text-red-600'>{message}</p>
      ) : null}
    </form>
  );
}
