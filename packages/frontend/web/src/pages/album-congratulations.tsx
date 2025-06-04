export default function AlbumCongratulations() {
  return (
    <div className='mt-5 flex flex-col items-center'>
      <h1 className='text-secondary text-2xl font-bold'>
        {'CONGRATULATIONS!!!🎊'}
      </h1>
      <h2 className='text-secondary text-xl'>
        {'artists.name'} {'just made a new album'}
      </h2>
      <div className='mt-10 flex flex-col items-center'>
        <h3 className='text-secondary text-2xl'> {'Album.name'}</h3>
        <img className='h-22 w-22' src='/assets/album.png' alt='' />
      </div>
      <div className='mt-3'>
        <div className='flex'>
          <h2 className='text-secondary mr-2 font-bold'>
            {'Your reputation is now:'}
          </h2>
          <h3 className='text-secondary flex font-bold'>
            {'notoriety'}
            <img
              className='h-6 w-6'
              src='/assets/star-sign.png'
              alt='star sign'
            />
          </h3>
        </div>
        <div className='flex'>
          <h2 className='text-secondary mr-2 font-bold'>
            {'You just earned:'}
          </h2>
          <h3 className='text-secondary flex font-bold'>
            {'money'}
            <img
              className='mt-0.5 h-5 w-6 pl-1'
              src='/assets/dollar-icon.png'
              alt='star sign'
            />
          </h3>
        </div>
      </div>
    </div>
  );
}
