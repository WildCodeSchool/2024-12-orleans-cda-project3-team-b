export default function authLoader() {
  return (
    <div className='flex min-h-[75vh] flex-col items-center justify-center'>
      <p className='font-red-rose text-2xl font-semibold'>{'LOADING ...'}</p>
      <div className='relative mx-auto h-46 w-46'>
        <img
          src='/assets/album.png'
          alt='loader'
          className='absolute inset-0 m-auto w-full animate-[spin_1.4s_linear_infinite] rounded-full object-contain'
        />
      </div>
      <p className='font-red-rose text-xl text-gray-600'>{'Please wait'}</p>
    </div>
  );
}
