import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Label as MusicLabel } from '../../../../backend/api/src/games/get-labels';
import type { Logo } from '../../../../backend/api/src/games/get-logos';
import Label from './label';

type Logos = {
  logos: Logo[];
};

export default function RegisterLabel() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [input, setInput] = useState<string>('');
  const [selectedLogo, setSelectedLogo] = useState<number>();
  const [message, setMessage] = useState('');
  const [labels, setLabels] = useState<MusicLabel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const apiUrl = `/api/games/labels`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setLabels(data.labels);
      } catch (error) {
        console.error('Error details:', error);
        setLabels([]);
      }
    };

    const fetchLogos = async () => {
      try {
        const res = await fetch(`/api/games/logos`);
        const data: Logos = await res.json();
        setLogos(data.logos);
      } catch (error) {
        console.error('Error details:', error);
        setLogos([]);
      }
    };

    void fetchLabels();
    void fetchLogos();
  }, []);

  useEffect(() => {
    if (labels.length !== 0) {
      void navigate('/main-menu');
    }
  }, [labels, navigate]);

  const register = async (event: FormEvent) => {
    event.preventDefault();

    if (!input.trim() || selectedLogo === undefined) {
      setMessage('All fields are required');
      return;
    }

    try {
      const res = await fetch(`/api/games/register-label`, {
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
    } catch (error) {
      console.error('Error registering label:', error);
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='mt-4 flex flex-col items-center'>
        <h1 className='text-secondary text-center font-bold md:text-2xl'>
          {'CONGRATULATIONS!!'}
        </h1>
        <p className='text-secondary md:text-lg'>
          {'on creating your new music label!'}
        </p>
      </div>
      <div className='mb-10 w-60 text-center md:w-150'>
        <p className='text-secondary md:text-xm mt-4 text-sm'>
          {
            'Are you ready to reach the heights of success? Will you live up to it?'
          }
        </p>
        <p className='text-secondary md:text-xm text-sm'>
          {
            'To take the first step towards success, define a name for your label!'
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
          className='bg-orange text-primary h-10 w-24 rounded text-lg shadow-[3px_5px_6px_rgba(0,0,0,0.30)] transition-transform active:scale-95'
        >
          {'APPLY'}
        </button>
      </form>
      {message ? <p className='text-center'>{message}</p> : null}
    </div>
  );
}
