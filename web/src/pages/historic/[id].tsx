import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { NavBar } from "@/components/NavBar";
import { IHistories } from "../home";

import { api } from "@/lib/axios";

export default function Page() {
  const { query } = useRouter();

  const [history, setHistory] = useState({} as IHistories);

  async function getHistory() {
    try {
      const { data } = await api.get(`/historic/${query.id}`);

      console.log(data);

      setHistory(data);
    } catch {
      toast.error(
        `Houve algum erro ao capturar detalhes da transação! Tente novamente!`
      );
    }
  }

  useEffect(() => {
    if (query.id) {
      getHistory();
    }
  }, []);

  return (
    <div className='h-screen w-full'>
      <NavBar />
    </div>
  );
}
