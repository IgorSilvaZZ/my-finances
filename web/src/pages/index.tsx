import { useRouter } from "next/router";
import Image from "next/image";

import loginImage from "../assets/handy-finance.png";

export default function Home() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center h-screen max-w-[1124px] mx-auto'>
      <main className='max-h-[600px] h-screen max-w-[1000px] w-screen rounded-xl bg-zinc-700 flex'>
        <div className='w-[500px] h-full flex flex-col items-center justify-evenly gap-8 bg-zinc-800'>
          <span className='font-semibold text-gray-300 text-2xl'>
            My Finances
          </span>

          <section className='flex flex-col items-center justify-center gap-3'>
            <span className='font-semibold text-gray-300 text-xl'>
              Bem-vindo de volta
            </span>
            <span className='font-light text-gray-500 text-sm'>
              Seja bem vindo de volta que tal logar na sua conta!
            </span>

            <input
              type='text'
              placeholder='Email'
              className='flex-1 w-80 px-4 py-4 outline-none rounded-xl text-gray-300 bg-zinc-800 border border-zinc-600 font-semibold'
            />
            <input
              type='password'
              placeholder='Senha'
              className='flex-1 w-80 px-4 py-4 outline-none rounded-xl text-gray-300 bg-zinc-800 border border-zinc-600 font-semibold'
            />

            <button className='py-3 w-80 bg-violet-600 text-white font-semibold rounded-xl transition-colors hover:bg-violet-800'>
              Entrar
            </button>

            <span className='font-semibold text-gray-400 text-sm'>Ou</span>

            <button
              onClick={() => router.push("/register")}
              className='py-3 w-60 bg-violet-800 text-white font-semibold rounded-xl transition-colors hover:bg-violet-900'
            >
              Registrar-se
            </button>
          </section>
        </div>
        <div className='w-[500px] h-full flex items-center justify-center'>
          <Image src={loginImage} alt='Login Image' className='w-80' />
        </div>
      </main>
    </div>
  );
}
