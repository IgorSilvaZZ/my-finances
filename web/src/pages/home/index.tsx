import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import numeral from "numeral";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { CardHistory } from "@/components/CardHistory";
import { NavBar } from "@/components/NavBar";

import { selectUser } from "../../store/users/user.slice";

import { api } from "../../lib/axios";
import { ModalCreateHistory } from "@/components/ModalCreateHistory";

export interface IHistories {
  id: string;
  description: string;
  value: number;
  type: string;
  isExit: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ICategoriesUser {
  id: string;
  description: string;
  icon: string;
  userId: string;
  createdAt: Date;
  updateAt: Date;
}

export default function Home() {
  const user = useSelector(selectUser);

  const [histories, setHistories] = useState<IHistories[]>([]);
  const [categoriesUser, setCategoriesUser] = useState<ICategoriesUser[]>([]);

  const headers = {
    Authorization: `Bearer ${user.token}`,
  };

  async function getCategoriesUser() {
    try {
      const { data } = await api.get("/categories/user", {
        headers,
      });

      setCategoriesUser(data);
    } catch (error) {
      toast.error("Erro ao listar suas categorias! Tente novamente!");
    }
  }

  async function getHistories() {
    const { data: histories } = await api.get("/historic", {
      headers,
    });

    setHistories(histories);
  }

  useEffect(() => {
    getCategoriesUser();
    getHistories();
  }, []);

  return (
    <div className='h-screen w-full'>
      <NavBar />

      <main className='flex flex-col items-center gap-4 mx-auto max-w-[1100px] mt-5'>
        <div className='flex items-center justify-center flex-col gap-3 w-full h-52 bg-zinc-800 rounded-lg'>
          <p className='text-base text-zinc-500 font-semibold'>
            {dayjs().format("dddd, DD [de] MMMM [de] YYYY")}
          </p>
          <p className='text-2xl text-white font-bold'>
            Bem vindo, {user.name}
          </p>
          <div className='h-12 w-[450px] bg-violet-600 flex items-center justify-center gap-3 rounded-lg mt-4'>
            <span className='text-white text-lg font-semibold'>
              Saldo Atual: R$ {numeral(user.balance).format("0,0")}
            </span>
          </div>
        </div>

        <div className='flex flex-col items-center gap-2 w-full h-80 overflow-x-hidden bg-zinc-800 rounded-lg'>
          <div className='flex w-full h-5 items-center justify-between text-sm font-semibold px-4 mt-2'>
            <p className='text-zinc-500'>Historico de Transações</p>
            <ModalCreateHistory
              categoriesUser={categoriesUser}
              getHistories={getHistories}
              getCategoriesUser={getCategoriesUser}
            />
          </div>

          <div className='flex flex-col items-center px-2 py-4 gap-2 overflow-y-auto'>
            {histories?.map(({ id, description, isExit, value, createdAt }) => (
              <CardHistory
                id={id}
                key={id}
                description={description}
                createdAt={createdAt.toString()}
                value={value}
                isExit={isExit}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
