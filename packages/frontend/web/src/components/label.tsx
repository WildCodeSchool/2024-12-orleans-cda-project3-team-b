import type { ChangeEvent } from 'react';

import type { Logo } from '../../../../backend/api/src/games/get-logos';

type LabelProps = {
  readonly setValue: (value: string) => void;
  readonly logos: Logo[];
  readonly selectedLogo: number | undefined;
  readonly setSelectedLogo: (id: number) => void;
};

export default function Label({
  setValue,
  logos,
  selectedLogo,
  setSelectedLogo,
}: LabelProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleLogoSelection = (logoId: number) => {
    setSelectedLogo(logoId);
  };

  return (
    <div className='flex flex-col items-center text-center'>
      <label className='text-secondary mb-1 font-semibold' htmlFor='label'>
        {'Choose the name of your label: '}
      </label>
      <input
        type='text'
        id='label'
        placeholder='max 32 characters'
        className='placeholder-secondary h-8 rounded-sm border-1 border-gray-200 px-2 text-center text-sm shadow-[3px_5px_6px_rgba(0,0,0,0.30)] inset-ring-2 inset-ring-white outline-none md:w-78'
        onChange={handleInputChange}
      />
      <label className='text-secondary mt-5 font-semibold' htmlFor='label'>
        {'Choose your logo: '}
      </label>
      <div className='mt-4 flex'>
        {logos.map((logo) => (
          <label
            key={logo.id}
            className={`mb-2 cursor-pointer rounded border p-2 ${
              selectedLogo === logo.id
                ? 'border-orange border-2'
                : 'border-transparent'
            }`}
          >
            <img
              src={`/assets/${logo.logo_img}`}
              alt={`Logo ${logo.id}`}
              className='m-auto w-20'
            />
            <input
              type='radio'
              name='gameLogo'
              value={logo.id}
              checked={selectedLogo === logo.id}
              onChange={() => {
                handleLogoSelection(logo.id);
              }}
              className='hidden'
            />
          </label>
        ))}
      </div>
    </div>
  );
}
