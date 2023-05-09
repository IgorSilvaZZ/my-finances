import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";

import { Check, Plus, X } from "@phosphor-icons/react";

import { CardHistory } from "@/components/CardHistory";
import { NavBar } from "@/components/NavBar";

const histories = [
  {
    id: "8e0c4b88-6644-4a12-94ad-57a782b65406",
    description: "Escrivaninha",
    value: 350.0,
    type: "Variable",
    isExit: true,
    createdAt: "2023-04-13T02:13:51.372Z",
    updatedAt: "2023-04-13T02:13:51.372Z",
    userId: "b4b8f142-7d2b-4330-8661-fd9a617514eb",
  },
  {
    id: "8e0c4b88-6644-4a12-94ad-57a782b65406",
    description: "Mesa de Cozinha",
    value: 150.0,
    type: "Variable",
    isExit: true,
    createdAt: "2023-04-25T02:13:51.372Z",
    updatedAt: "2023-04-25T02:13:51.372Z",
    userId: "b4b8f142-7d2b-4330-8661-fd9a617514eb",
  },
  {
    id: "8e0c4b88-6644-4a12-94ad-57a782b65406",
    description: "Pix da Ana",
    value: 80.0,
    type: "Variable",
    isExit: false,
    createdAt: "2023-04-28T02:13:51.372Z",
    updatedAt: "2023-04-28T02:13:51.372Z",
    userId: "b4b8f142-7d2b-4330-8661-fd9a617514eb",
  },
];

interface NewHistory {
  value: number;
  description: string;
  type: string;
  isExist: boolean;
}

export default function Home() {
  const [formNewHistory, setFormNewHistory] = useState({
    value: 0,
    description: "",
    isExist: false,
    type: "",
  } as NewHistory);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(formNewHistory);
  }

  function handleFormHistory(event: React.FormEvent<HTMLInputElement>) {
    setFormNewHistory({
      ...formNewHistory,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  return (
    <div className='h-screen w-full'>
      <NavBar />

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

        <div className='flex flex-col items-center gap-2 w-full h-80 overflow-x-hidden bg-zinc-800 rounded-lg'>
          <div className='flex w-full h-5 items-center justify-between text-sm font-semibold px-4 mt-2'>
            <p className='text-zinc-500'>Historico de Transações</p>

            <Dialog.Root>
              <Dialog.Trigger
                className='text-violet-700 flex items-center gap-2 font-semibold transition-colors hover:text-violet-800'
                type='button'
              >
                <Plus size={15} />
                Adicionar novo
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />

                <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <Dialog.Close className='absolute right-6 top-6 rounded-lg text-violet-600 transition-colors hover:text-violet-800'>
                    <X size={24} arial-label='Fechar' />
                  </Dialog.Close>

                  <Dialog.Title className='text-xl leading-tight text-white font-semibold'>
                    Adicionar nova Transação
                  </Dialog.Title>

                  <form
                    className='w-full flex flex-col mt-6'
                    onSubmit={handleSubmit}
                  >
                    <label
                      htmlFor='description'
                      className='font-semibold leading-tight text-zinc-500'
                    >
                      Qual vai ser a descrição?
                    </label>

                    <input
                      type='text'
                      id='description'
                      name='description'
                      placeholder='ex.: Mercadinho, Salario, Mercado...'
                      className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline focus:ring-2 focus:ring-violet-600'
                      autoFocus
                      onChange={handleFormHistory}
                    />

                    <label
                      htmlFor='value'
                      className='font-semibold leading-tight text-zinc-500 mt-4'
                    >
                      Qual valor da transação?
                    </label>
                    <input
                      type='text'
                      id='value'
                      name='value'
                      placeholder='500.00, 30.00...'
                      className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline focus:ring-2 focus:ring-violet-600'
                      onChange={handleFormHistory}
                    />

                    <div className='flex items-center justify-between w-full mt-6'>
                      <select
                        name='type'
                        className='p-2 rounded-lg bg-zinc-800 text-white w-60 outline-none border-2 border-zinc-800'
                      >
                        <option value='select' selected>
                          Selecione o Tipo
                        </option>
                        <option value='variable'>Variavel</option>
                        <option value='fixe'>Fixo</option>
                      </select>

                      <Checkbox.Root
                        className='flex items-center gap-3'
                        onCheckedChange={() =>
                          setFormNewHistory({
                            ...formNewHistory,
                            isExist: !formNewHistory.isExist,
                          })
                        }
                      >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800'>
                          <Checkbox.Indicator>
                            <Check
                              size={20}
                              className='text-violet-400 font-bold'
                            />
                          </Checkbox.Indicator>
                        </div>

                        <span className=' text-zinc-300 font-semibold leading-tight'>
                          Saida
                        </span>
                      </Checkbox.Root>
                    </div>

                    <button
                      type='submit'
                      className='mt-6 rounded-lg p-3 flex gap-3 items-center justify-center font-semibold bg-violet-800 text-white transition-colors hover:bg-violet-900'
                    >
                      <Check size={20} weight='bold' />
                      Salvar
                    </button>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <div className='flex flex-col items-center px-2 py-4 gap-2 overflow-y-auto'>
            {histories.map(({ id, description, isExit, value, createdAt }) => (
              <CardHistory
                id={id}
                description={description}
                createdAt={createdAt}
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
