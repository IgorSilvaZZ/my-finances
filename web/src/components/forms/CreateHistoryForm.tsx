import numeral from "numeral";

import { INewHistory } from "../ModalCreateHistory";

import * as Tooltip from "@radix-ui/react-tooltip";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, Question } from "@phosphor-icons/react";
import { ICategoriesUser } from "@/pages/home";

interface CreateHistoryFormProps {
  formNewHistory: INewHistory;
  categoriesUser: ICategoriesUser[];
  setViewCreateCategory: (isView: boolean) => void;
  handleFormHistory: (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLSelectElement>
  ) => void;
  setFormNewHistory: (newFormNewHistoryState: INewHistory) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const CreateHistoryForm = ({
  formNewHistory,
  categoriesUser,
  setViewCreateCategory,
  handleFormHistory,
  setFormNewHistory,
  handleSubmit,
}: CreateHistoryFormProps) => {
  return (
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

      <label
        htmlFor='categoryId'
        className='font-semibold leading-tight text-zinc-500 mt-4'
      >
        Selecione a categoria da transação
      </label>

      <select
        name='categoryId'
        className='p-2 rounded-lg bg-zinc-800 text-white outline-none border-2 border-zinc-800 mt-4'
        onChange={handleFormHistory}
      >
        {categoriesUser.map(({ description, id }) => (
          <option key={id} value={id}>
            {description}
          </option>
        ))}
      </select>

      <span className='text-zinc-600 text-xs mt-2 font-medium'>
        Não tem a categoria que gostaria?{" "}
        <button
          onClick={() => setViewCreateCategory(true)}
          className='text-violet-500 font-bold cursor-pointer outline-none border-none bg-none'
        >
          Crie aqui!
        </button>
      </span>

      <div className='flex items-center justify-between w-full mt-6'>
        <select
          name='type'
          className='p-2 rounded-lg bg-zinc-800 text-white w-60 outline-none border-2 border-zinc-800'
          value={formNewHistory.type}
          onChange={handleFormHistory}
        >
          <option value='select' selected>
            Selecione o Tipo
          </option>
          <option value='variable'>Variavel</option>
          <option value='fixe'>Fixo</option>
        </select>

        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <Question size={20} className='text-violet-500 font-bold' />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className='w-52 rounded-md px-3 py-4 text-sm text-violet-700 bg-white'>
                <b>Fixo: </b> Será descontado do seu saldo todo mês <br />
                <b>Variavel: </b> Um gasto que nem sempre será descontado e pode
                ter ou não em um mês
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

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
  );
};
