import { useRef } from "react";

import { useSelector } from "react-redux";
import numeral from "numeral";
import dayjs from "dayjs";

import { selectUser } from "@/store/users/user.slice";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { months, getYears } from "@/utils/headerHome";

export const Header = () => {
  const user = useSelector(selectUser);

  const years = getYears();

  const nameTransaction = useRef(null);
  const nameCategory = useRef(null);
  const year = useRef(null);
  const month = useRef(null);

  async function getSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dataSearch = {
      nameTransaction,
      nameCategory,
      year,
      month
    };

    console.log(dataSearch);    
  }

  return (
    <div className='flex items-center justify-center gap-3 w-full h-52 bg-zinc-800 rounded-lg'>
      <div className='flex items-center justify-center flex-col gap-3 w-2/5'>
        <p className='text-base text-zinc-500 font-semibold'>
          {dayjs().format("dddd, DD [de] MMMM [de] YYYY")}
        </p>
        <p className='text-xl text-white font-bold'>Bem vindo, {user.name}</p>
        <div className='h-10 w-[250px] bg-violet-600 flex items-center justify-center gap-3 rounded-lg mt-4'>
          <span className='text-white text-base font-semibold'>
            Saldo Atual: R$ {numeral(user.balance).format("0,0")}
          </span>
        </div>
      </div>

      <div className='flex flex-col gap-3 w-1/2 px-5 justify-center items-center rounded-lg'>
        <div className='flex items-center gap-3 h-12 w-full'>
          <input
            type='text'
            className='bg-zinc-700 rounded-lg text-white w-full p-3 h-11 border-none outline-none font-bold'
            placeholder='Nome da transação'
            ref={nameTransaction}
          />

          <button className='w-12 p-3 h-11 flex items-center justify-center rounded-xl bg-violet-600'>
            <MagnifyingGlass size={30} className='text-white font-bold' />
          </button>
        </div>

        <div className='flex items-center gap-2 justify-between h-20 w-full'>
          <div className='flex flex-col gap-3 w-40'>
            <label
              htmlFor='categoryId-search'
              className='font-semibold leading-tight text-zinc-500'
            >
              Categoria
            </label>
            <select
              id='categoryId-search'
              className='p-2 rounded-lg bg-zinc-700 text-white outline-none border-2 border-zinc-800'
              ref={nameCategory}
            >
              <option value=''>Viagem</option>
              <option value=''>Lazer</option>
              <option value=''>Domestico</option>
            </select>
          </div>

          <div className='flex flex-col gap-3 w-40'>
            <label
              htmlFor='categoryId-search'
              className='font-semibold leading-tight text-zinc-500'
            >
              Ano
            </label>
            <select
              id='categoryId-search'
              className='p-2 rounded-lg bg-zinc-700 text-white outline-none border-2 border-zinc-800'
              ref={year}
            >
              {years.map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col gap-3 w-40'>
            <label
              htmlFor='categoryId-search'
              className='font-semibold leading-tight text-zinc-500'
            >
              Mês
            </label>
            <select
              id='categoryId-search'
              className='p-2 rounded-lg bg-zinc-700 text-white outline-none border-2 border-zinc-800'
              ref={month}
            >
              {months.map(({ title, value }) => (
                <>
                  <option value={value}>{title}</option>
                </>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
