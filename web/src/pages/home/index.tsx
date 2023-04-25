export default function Home() {
  return (
    <div className='h-screen w-full'>
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

      <main className='flex flex-col items-center gap-4 mx-auto max-w-[1100px] mt-5'>
        <div className='flex items-center justify-center flex-col gap-3 w-full h-52 bg-zinc-800 rounded-lg'>
          <p className='text-base text-zinc-500 font-semibold'>
            Segunda-Feira, 24 de Abril de 2023
          </p>
          <p className='text-2xl text-white font-bold'>Bem vindo, Igor Silva</p>
          <div className='h-12 w-[450px] bg-violet-600 flex items-center justify-center gap-3 rounded-lg mt-4'>
            <span className='text-white text-lg font-semibold'>
              Saldo Atual: R$ 0,00
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-2 w-full h-80 overflow-x-hidden bg-zinc-800 rounded-lg'>
          <div className='flex w-full h-5 items-center justify-between text-sm font-semibold px-4 mt-2'>
            <p className='text-zinc-500'>Historico de Transações</p>
            <span className='text-violet-700 cursor-pointer'>
              + Adicionar novo
            </span>
          </div>

          <div className='overflow-y-auto'></div>
        </div>
      </main>
    </div>
  );
}
