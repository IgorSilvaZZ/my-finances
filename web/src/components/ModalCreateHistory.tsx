import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import * as yup from "yup";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import numeral from "numeral";

import { Check, Plus, X } from "@phosphor-icons/react";

import { selectUser } from "@/store/users/user.slice";
import { api } from "../lib/axios";

interface IModalCreateHistoryProps {
  getHistories(): Promise<void>;
}

interface INewHistory {
  value: number;
  valueFormatted?: string;
  description: string;
  type: string;
  isExit: boolean;
}

export const ModalCreateHistory = ({
  getHistories,
}: IModalCreateHistoryProps) => {
  const user = useSelector(selectUser);

  const [formNewHistory, setFormNewHistory] = useState({
    description: "",
    value: 0,
    valueFormatted: "0",
    isExit: false,
    type: "",
  } as INewHistory);

  const [modalOpen, setModalOpen] = useState(false);

  function handleFormHistory(event: React.FormEvent<HTMLInputElement>) {
    setFormNewHistory({
      ...formNewHistory,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const historySchema = yup.object().shape({
      description: yup
        .string()
        .required("A Descrição é obrigatorio para prosseguir!")
        .min(5, "Coloque uma descrição no minimo de 5 caracteres"),
      valueFormatted: yup
        .string()
        .required("O valor da transação é obrigatorio para prosseguir!"),
      type: yup
        .string()
        .required("Selecione pelo menos tipo de transação para continuar!"),
    });

    try {
      await historySchema.validate(formNewHistory, { abortEarly: false });

      const newHistoryData = {
        ...formNewHistory,
        value: numeral(formNewHistory.valueFormatted).value(),
      };

      delete newHistoryData.valueFormatted;

      try {
        console.log(newHistoryData);

        await api.post("/historic", newHistoryData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        toast.success("Transação cadastrada com sucesso!");

        setModalOpen(!modalOpen);

        setFormNewHistory({
          description: "",
          value: 0,
          valueFormatted: "0",
          isExit: false,
          type: "",
        });

        getHistories();
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
            console.log(`Erro ao cadastrar nova transação! Tente novamente!`);
          } else if (error.response.status === 500) {
            console.log(
              `Erro interno no servidor! Contate o suporte para mais informações!`
            );
          }
        }
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const [firstMessage] = error.inner;

        return toast.error(String(firstMessage.message));
      }
    }
  }

  return (
    <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
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

          <form className='w-full flex flex-col mt-6' onSubmit={handleSubmit}>
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
              value={formNewHistory.description}
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
              name='valueFormatted'
              value={formNewHistory.valueFormatted}
              placeholder='500.00, 30.00...'
              className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline focus:ring-2 focus:ring-violet-600'
              onChange={(e) =>
                setFormNewHistory({
                  ...formNewHistory,
                  valueFormatted: numeral(e.target.value).format("0,0"),
                })
              }
            />

            <div className='flex items-center justify-between w-full mt-6'>
              <select
                name='type'
                className='p-2 rounded-lg bg-zinc-800 text-white w-60 outline-none border-2 border-zinc-800'
                value={formNewHistory.type}
                onChange={(e) =>
                  setFormNewHistory({ ...formNewHistory, type: e.target.value })
                }
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
                    isExit: !formNewHistory.isExit,
                  })
                }
              >
                <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800'>
                  <Checkbox.Indicator>
                    <Check size={20} className='text-violet-400 font-bold' />
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
  );
};
