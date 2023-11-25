import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

import { IHistories } from "@/interfaces/IHistories.interface";
import { ICategoriesUser } from "@/interfaces/ICategoriesUser.interface";
import { IParamsHistoricList } from "@/interfaces/IParamsHistoricList.interface";

import { CardHistory } from "@/components/CardHistory";
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";

import { selectUser } from "../../store/users/user.slice";
import { selectFilters } from "../../store/filters/filters.slice";

import { api } from "../../lib/axios";
import { ModalCreateHistory } from "@/components/ModalCreateHistory";
import { currentYear } from "@/utils/headerHome";

type TypeFiltersSearch = {
  description?: string;
  categoryId?: string;
  mouth?: string;
  year: string;
};

export default function Home() {
  const user = useSelector(selectUser);
  const filters = useSelector(selectFilters);

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

  async function getHistories(
    params: IParamsHistoricList = { year: currentYear }
  ) {
    try {
      setLoading(true);

      const validParams = { ...params };

      Object.keys(validParams).forEach((key) => {
        const filterKey = key as keyof TypeFiltersSearch;
        const value = validParams[filterKey];

        if (filterKey !== "year") {
          if (!value || value === "all") {
            delete validParams[filterKey];
          }
        }
      });

      const { data: histories } = await api.get("/historic", {
        headers,
        params: validParams,
      });

      setHistories(histories);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao listar historico de transações! Tente novamente!");
    } finally {
      setLoading(false);
    }
  }

  async function getInfosUser() {
    const requests = [getCategoriesUser(), getHistories(filters)];

    await Promise.all(requests);
  }

  useEffect(() => {
    getInfosUser();
  }, []);

  return (
    <div className='h-screen w-full'>
      <NavBar />

      <main className='flex flex-col items-center gap-4 mx-auto max-w-[1100px] mt-5'>
        <Header categoriesUser={categoriesUser} getHistories={getHistories} />

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
