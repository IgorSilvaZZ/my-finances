import React, { useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";

import RegisterImage from "../../assets/handy-safe-protects.png";

interface UserDataForm {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  } as UserDataForm);

  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Requisição para API
    console.log(formData);
  }

  function handleFormData(event: React.FormEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  return (
    <div className='flex items-center justify-center h-screen max-w-[1124px] mx-auto'>
      <main className='max-h-[600px] h-screen max-w-[1000px] w-screen bg-zinc-700 flex'>
        <div className='w-[500px] h-full flex items-center justify-center bg-zinc-800'>
          <Image src={RegisterImage} alt='Register Image' className='w-80' />
        </div>
        <div className='w-[500px] h-full flex flex-col items-center justify-center gap-10'>
          <section className='w-80'>
            <button
              className='border-none bg-none outline-none'
              title='Voltar'
              onClick={() => router.back()}
            >
              <ArrowLeft
                size={24}
                className='text-gray-300 transition-colors hover:text-gray-500'
              />
            </button>
          </section>

          <section className='flex flex-col justify-center items-center gap-4'>
            <span className='font-semibold text-gray-300 text-2xl'>
              Criação de conta
            </span>
            <span className='font-light text-gray-500 text-base'>
              Seja bem vindo de volta que tal logar na sua conta!
            </span>
          </section>

          <form
            onSubmit={createUser}
            className='flex flex-col items-center justify-center gap-3'
          >
            <input
              type='text'
              placeholder='Nome'
              name='name'
              onChange={(e) => handleFormData(e)}
              className='flex-1 w-80 px-4 py-4 outline-none rounded-xl text-gray-300 bg-zinc-800 border border-zinc-600 font-semibold'
            />

            <input
              type='text'
              placeholder='Email'
              name='email'
              onChange={(e) => handleFormData(e)}
              className='flex-1 w-80 px-4 py-4 outline-none rounded-xl text-gray-300 bg-zinc-800 border border-zinc-600 font-semibold'
            />

            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={(e) => handleFormData(e)}
              className='flex-1 w-80 px-4 py-4 outline-none rounded-xl text-gray-300 bg-zinc-800 border border-zinc-600 font-semibold'
            />

            <button
              type='submit'
              className='py-3 w-80 bg-violet-800 text-white font-semibold rounded-xl transition-colors hover:bg-violet-900'
            >
              Enviar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
