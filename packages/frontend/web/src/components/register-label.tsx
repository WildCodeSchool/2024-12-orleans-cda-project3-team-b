import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Logo } from './label';
import Label from './label';

type Logos = {
  logos: Logo[];
};

type Labels = {
  budget: number;
  id: number;
  levels_id: number;
  logos_id: number;
  name: string;
  notoriety: number;
  score_xp: number;
};
export default function RegisterLabel() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [input, setInput] = useState<string>('');
  const [selectedLogo, setSelectedLogo] = useState<number>();
  const [message, setMessage] = useState('');
  const [labels, setLabels] = useState<Labels[]>([]);
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
    const res = await fetch(`/api/games/register-label`, {
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
