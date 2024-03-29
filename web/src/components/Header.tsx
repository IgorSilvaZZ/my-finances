import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import numeral from "numeral";

import dayjs from "dayjs";
import { MagnifyingGlass } from "@phosphor-icons/react";

import { ICategoriesUser } from "@/interfaces/ICategoriesUser.interface";
import { IParamsHistoricList } from "@/interfaces/IParamsHistoricList.interface";

import { selectUser } from "@/store/users/user.slice";
import { filtersAction, selectFilters } from "@/store/filters/filters.slice";

import { months, getYears, currentYear } from "@/utils/headerHome";
interface IHeaderProps {
  getHistories(params: IParamsHistoricList): Promise<void>;
}

export const Header = ({ getHistories }: IHeaderProps) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const filters = useSelector(selectFilters);

  const categories = user.categories as ICategoriesUser[] | [];

  const years = getYears();

  const nameTransaction = useRef<HTMLInputElement>(null);
  const nameCategory = useRef<HTMLSelectElement>(null);
  const year = useRef<HTMLSelectElement>(null);
  const mouth = useRef<HTMLSelectElement>(null);

  const listCategoriesUser = [
    { id: "all", description: "Todos" },
    ...categories,
  ];

  async function getSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = {
      description: nameTransaction.current?.value,
      categoryId: nameCategory.current?.value,
      year: year.current?.value ?? currentYear,
      mouth: mouth.current?.value,
    };

    const dataSearch = {
      filters: {
        ...params,
      },
    };

    dispatch(filtersAction.searchFilter(dataSearch));

    // Aqui enviar a requisição aqui dos filtros para a api
    await getHistories(params);
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

      <form
        onSubmit={getSearch}
        className='flex flex-col gap-3 w-1/2 px-5 justify-center items-center rounded-lg'
      >
        <div className='flex items-center gap-3 h-12 w-full'>
          <input
            type='text'
            className='bg-zinc-700 rounded-lg text-white w-full p-3 h-11 border-none outline-none font-bold'
            placeholder='Nome da transação'
            ref={nameTransaction}
          />

          <button
            type='submit'
            className='w-12 p-3 h-11 flex items-center justify-center rounded-xl bg-violet-600'
          >
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
              {listCategoriesUser.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.description}
                </option>
              ))}
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
              ref={mouth}
            >
              {months.map(({ title, value }) => (
                <>
                  <option value={value}>{title}</option>
                </>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};
