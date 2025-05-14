import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

const API_URL = import.meta.env.VITE_API_URL;
type Logo = {
  id: number;
  logo_img: string;
};
type Logos = {
  logos: Logo[];
};
export default function RegisterLabel() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [input, setInput] = useState<string>('');
  const [selectedLogo, setSelectedLogo] = useState<number>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const isFirstTime = async () => {
      if (auth?.user?.is_first_time !== 1) {
        try {
          await navigate('/main-menu');
        } catch {
          return null;
        }
      }
    };
    void isFirstTime();
  }, [auth, navigate]);

  useEffect(() => {
    const fetchLogos = async () => {
      const res = await fetch(`${API_URL}/games/logos`);
      const data: Logos = await res.json();
      setLogos(data.logos);
    };

    void fetchLogos();
  }, []);

  const register = async (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim() || selectedLogo === undefined) {
      setMessage('All fields are required');
      return;
    }
    const res = await fetch(`${API_URL}/games/register-label`, {
      method: 'POST',
      body: JSON.stringify({
        name: input,
        logosId: logos.find((logo) => logo.id === selectedLogo)?.id,
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (res.ok) {
      await navigate('/main-menu');
    } else {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <h1 className='mb-20 text-center'>{'CONGRATULATIONS'}</h1>
      <div className='mb-20 text-center'>
        <p>{'on creating your new music label! '}</p>
        <br />
        <p>
          {
            'Are you ready to reach the heights of success? Will you live up to it? To take the first step towards success, define a name for your label!'
          }
        </p>
      </div>
      <form
        className='flex flex-col items-center text-center'
        onSubmit={async (event) => {
          await register(event);
        }}
      >
        <label htmlFor='label'>{'Choose your name of label : '}</label>
        <input
          type='text'
          id='label'
          placeholder='max 32 characters'
          className='w-52 border-2 border-gray-600'
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <div className='flex'>
          {logos.map((logo) => (
            <label
              key={logo.id}
              className={`m-2 cursor-pointer rounded border p-2 ${
                selectedLogo === logo.id
                  ? 'border-blue-500'
                  : 'border-transparent'
              }`}
            >
              <img
                src={`/assets/${logo.logo_img}`}
                alt={`Logo ${logo.id}`}
                className='m-auto w-10'
              />
              <input
                type='radio'
                name='gameLogo'
                value={logo.id}
                checked={selectedLogo === logo.id}
                onChange={() => {
                  setSelectedLogo(logo.id);
                }}
                className='hidden'
              />
            </label>
          ))}
        </div>
        <button
          type='submit'
          className='rounded border-2 border-gray-500 bg-gray-500'
        >
          {'register'}
        </button>
      </form>
      {message ? <p className='text-center'>{message}</p> : null}
    </>
  );
}
