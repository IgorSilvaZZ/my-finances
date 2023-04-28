export const NavBar = () => {
  return (
    <nav className='flex items-center justify-between px-12 text-white h-16 w-full border-b border-gray-700'>
      <span className='text-white font-semibold text-xl'>My Finances</span>

      <div className='flex items-center justify-evenly w-52 h-full'>
        <div className='flex flex-col items-end justify-center w-32 h-8'>
          <p className='text-sm font-semibold text-zinc-400'>Igor Silva</p>
        </div>

        <div className='w-11 h-11 flex items-center justify-center rounded-full bg-violet-600 cursor-pointer'>
          <span className='text-white font-bold text-base uppercase'>IG</span>
        </div>
      </div>
    </nav>
  );
};
