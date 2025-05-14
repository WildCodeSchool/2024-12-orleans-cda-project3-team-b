import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

import type { Logo } from './label';
import Label from './label';

const API_URL = import.meta.env.VITE_API_URL;

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
    const firstLogin = async () => {
      if (auth?.user?.is_first_time !== 1) {
        try {
          await navigate('/main-menu');
        } catch {
          return null;
        }
      }
    };
    void firstLogin();
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
    const data = res;
    if (data.ok) {
      await navigate('/main-menu');
    } else {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <h1 className='mb-20 text-center'>{'CONGRATULATIONS'}</h1>
      <div className='mb-10 text-center'>
        <p className='m-4'>{'on creating your new music label! '}</p>
        <p className='m-4'>
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
        <Label
          setValue={setInput}
          logos={logos}
          selectedLogo={selectedLogo}
          setSelectedLogo={setSelectedLogo}
        />
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
