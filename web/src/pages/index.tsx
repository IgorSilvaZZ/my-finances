import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Image from "next/image";

import * as yup from "yup";

import { usersActions } from "../store/users/user.slice";
import { filtersAction } from "@/store/filters/filters.slice";

import { api } from "../lib/axios";

import loginImage from "../assets/handy-finance.png";

interface UserFormLogin {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  } as UserFormLogin);

  async function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userSchema = yup.object({
      email: yup
        .string()
        .email("Email invalido!")
        .required("Informe um email!"),
      password: yup.string().required("Informe uma senha!"),
    });

    try {
      await userSchema.validate(formData, { abortEarly: false });

      try {
        const { data } = await api.post("/users/login", formData);

        dispatch(usersActions.authenticate(data));
        dispatch(filtersAction.clearStateFilters());

        toast.success("Logado com sucesso!");

        router.push("/home");
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
            return toast.error("Email ou Senha incorretos!");
          } else if (error.response.status === 401) {
            return toast.error("Email ou Senha incorretos!");
          } else if (error.response.status === 500) {
            return toast.error(
              "Erro ao realizar login! Tente novemente em instantes!"
            );
          }
        } else {
          console.log("Error", error.message);
        }
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const [firstMessage] = error.inner;

        return toast.error(String(firstMessage.message));
      }
    }
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

            <form
              className='flex flex-col items-center justify-center gap-3'
              onSubmit={submitLogin}
            >
              <input
                type='text'
                placeholder='Email'
                name='email'
                onChange={(e) => handleFormData(e)}
                className='flex-1 w-80 px-4 py-4 outline-none rounded-xl text-gray-300 bg-zinc-800 border border-zinc-600 font-semibold'
              />
              <input
                type='password'
                placeholder='Senha'
                name='password'
                onChange={(e) => handleFormData(e)}
                className='flex-1 w-80 px-4 py-4 outline-none rounded-xl text-gray-300 bg-zinc-800 border border-zinc-600 font-semibold'
              />

              <button
                type='submit'
                className='py-3 w-80 bg-violet-600 text-white font-semibold rounded-xl transition-colors hover:bg-violet-800'
              >
                Entrar
              </button>
            </form>

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
