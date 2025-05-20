type Marketing = {
  readonly id: number;
  readonly name: number;
  readonly bonus: string;
  readonly price: string;
  readonly image: string;
};

export default function MarketingCard({
  id,
  name,
  bonus,
  price,
  image,
}: Marketing) {
  return (
    <div className='bg-secondary flex h-14 w-76 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'>
      <img className='h-10 w-10 rounded-4xl' src={`/assets/${image}`} alt='' />
      <div className='flex flex-col items-center text-sm'>
        <h2 className='ml-2'>{name}</h2>
        <h3 className='font-extralight'>{bonus}</h3>
      </div>
      <div className='flex items-center'>
        <p className='text-sm font-bold'>{price}</p>
        <img
          className='mt-0.5 h-3.5 w-3.5'
          src='/assets/dollar-icon.png'
          alt='dollar icon'
        />
      </div>
    </div>
  );
}
