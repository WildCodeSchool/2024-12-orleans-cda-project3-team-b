import type { FormEvent } from 'react';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const login = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();

    if (data.message === 'user already use') {
      setMessage('user already use');
    } else {
      setMessage('you can log now');
    }
  };

  return (
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
      <label htmlFor='' />
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
        {'Register\r'}
      </button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}
