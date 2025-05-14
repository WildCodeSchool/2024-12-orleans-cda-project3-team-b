import type { ChangeEvent } from 'react';

export type Logo = {
  id: number;
  logo_img: string;
};

type LabelProps = {
  readonly input: string;
  readonly setInput: (value: string) => void;
  readonly logos: Logo[];
  readonly selectedLogo: number | undefined;
  readonly setSelectedLogo: (id: number) => void;
};

export default function Label({
  input,
  setInput,
  logos,
  selectedLogo,
  setSelectedLogo,
}: LabelProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleLogoSelection = (logoId: number) => {
    setSelectedLogo(logoId);
  };

  return (
    <div className='flex flex-col items-center text-center'>
      <label htmlFor='label'>{'Choose your name of label : '}</label>
      <input
        type='text'
        id='label'
        placeholder='max 32 characters'
        className='w-52 border-2 border-gray-600'
        value={input}
        onChange={handleInputChange}
      />
      <div className='mt-4 flex'>
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
