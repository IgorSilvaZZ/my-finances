import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

import { CardHistory } from "@/components/CardHistory";
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";

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

export interface IParamsHistoricList {
  description?: string;
  categoryId?: string;
  year?: string;
  mouth?: string;
}

export default function Home() {
  const user = useSelector(selectUser);

  const [histories, setHistories] = useState<IHistories[]>([]);
  const [categoriesUser, setCategoriesUser] = useState<ICategoriesUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  async function getHistories(params: IParamsHistoricList = {}) {
    try {
      setLoading(true);

      const { data: histories } = await api.get("/historic", {
        headers,
        params,
      });

      setHistories(histories);
    } catch (error) {
      toast.error("Erro ao listar historico de transações! Tente novamente!");
    } finally {
      setLoading(false);
    }
  }

  async function getInfosUser() {
    const requests = [getCategoriesUser(), getHistories()];

    await Promise.all(requests);
  }

  useEffect(() => {
    getInfosUser();
  }, []);

  return (
    <div className='h-screen w-full'>
      <NavBar />

      <main className='flex flex-col items-center gap-4 mx-auto max-w-[1100px] mt-5'>
        <Header categoriesUser={categoriesUser} />

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
            {!loading ? (
              <>
                {histories.length > 0 ? (
                  <>
                    {histories?.map(
                      ({ id, description, isExit, value, createdAt }) => (
                        <CardHistory
                          id={id}
                          key={id}
                          description={description}
                          createdAt={createdAt.toString()}
                          value={value}
                          isExit={isExit}
                        />
                      )
                    )}
                  </>
                ) : (
                  <>
                    <div className='flex items-center justify-center w-[1000px] h-[1000px]'>
                      <span className='text-violet-500 font-semibold text-base'>
                        Nenhuma Transação encontrada
                      </span>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className='flex items-center justify-center w-[1000px] h-[1000px]'>
                  <ReactLoading type='spin' color='#8b5cf6' />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
