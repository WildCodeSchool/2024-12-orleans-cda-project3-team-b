type ChooseNameProps = {
  readonly name: string;
  readonly placeholder: string;
  readonly value: string;
  readonly onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ChooseName({
  name,
  placeholder,
  value,
  onChange,
}: ChooseNameProps) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-secondary mt-8 text-center text-xl'>{name}</h2>
      <input
        className='mt-3 w-full max-w-md rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-[1px_4px_6px_rgba(0,0,0,0.30)]'
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
