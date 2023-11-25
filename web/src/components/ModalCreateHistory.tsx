import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import * as yup from "yup";
import * as Dialog from "@radix-ui/react-dialog";
import numeral from "numeral";

import { Plus, X } from "@phosphor-icons/react";

import { CreateHistoryForm } from "./forms/CreateHistoryForm";
import { CreateCategoryForm } from "./forms/CreateCategoryForm";

import { selectUser, usersActions } from "@/store/users/user.slice";
import { selectFilters } from "@/store/filters/filters.slice";
import { IParamsHistoricList } from "@/interfaces/IParamsHistoricList.interface";

import { api } from "../lib/axios";

interface IModalCreateHistoryProps {
  getHistories(params: IParamsHistoricList): Promise<void>;
  getCategoriesUser(): Promise<void>;
}

export interface INewHistory {
  value: number;
  valueFormatted?: string;
  description: string;
  categoryId: string;
  type: string;
  isExit: boolean;
}

export const ModalCreateHistory = ({
  getHistories,
  getCategoriesUser,
}: IModalCreateHistoryProps) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const filters = useSelector(selectFilters);

  const [formNewHistory, setFormNewHistory] = useState({
    description: "",
    value: 0,
    valueFormatted: "0",
    isExit: false,
    type: "",
  } as INewHistory);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [viewCreateCategory, setViewCreateCategory] = useState<boolean>(false);
  const [newCategoryDescription, setNewCategoryDescription] =
    useState<string>("");

  function handleOpenModal() {
    setModalOpen(!modalOpen);

    setFormNewHistory({
      description: "",
      value: 0,
      valueFormatted: "0",
      categoryId: "",
      isExit: false,
      type: "",
    });
  }

  function handleFormHistory(
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLSelectElement>
  ) {
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
      categoryId: yup
        .string()
        .required("Seleciona a categoria para continuar!"),
    });

    try {
      await historySchema.validate(formNewHistory, { abortEarly: false });

      const newHistoryData = {
        ...formNewHistory,
        value: numeral(formNewHistory.valueFormatted).value(),
      };

      delete newHistoryData.valueFormatted;

      try {
        const { data } = await api.post("/historic", newHistoryData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const newBalance = data.newBalance;

        dispatch(usersActions.updateBalance({ balance: newBalance }));

        toast.success("Transação cadastrada com sucesso!");

        setModalOpen(!modalOpen);

        setFormNewHistory({
          description: "",
          categoryId: "",
          value: 0,
          valueFormatted: "0",
          isExit: false,
          type: "",
        });

        getHistories(filters);
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
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

  async function handleSubmitNewCategory(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const categorySchema = yup.object().shape({
      description: yup
        .string()
        .required("Digite o nome da categoria para continuar!")
        .min(
          4,
          "O nome da categoria deve ter 4 caracteres no minimo para prosseguir!"
        ),
    });

    const bodyNewCategory = {
      description: newCategoryDescription,
    };

    try {
      await categorySchema.validate(bodyNewCategory, { abortEarly: false });

      try {
        await api.post("/categories", bodyNewCategory, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        toast.success("Categoria criada com sucesso!");

        setViewCreateCategory(false);

        getCategoriesUser();
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
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
    <Dialog.Root open={modalOpen} onOpenChange={handleOpenModal}>
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
          <Dialog.Close
            onClick={() => setViewCreateCategory(false)}
            className='absolute right-6 top-6 rounded-lg text-violet-600 transition-colors hover:text-violet-800'
          >
            <X size={24} arial-label='Fechar' />
          </Dialog.Close>

          <Dialog.Title className='text-xl leading-tight text-white font-semibold'>
            {!viewCreateCategory
              ? "Adicionar nova Transação"
              : "Adiciona uma nova Categoria"}
          </Dialog.Title>

          {!viewCreateCategory ? (
            <CreateHistoryForm
              formNewHistory={formNewHistory}
              handleFormHistory={handleFormHistory}
              handleSubmit={handleSubmit}
              setFormNewHistory={setFormNewHistory}
              setViewCreateCategory={setViewCreateCategory}
            />
          ) : (
            <CreateCategoryForm
              newCategoryDescription={newCategoryDescription}
              setNewCategoryDescription={setNewCategoryDescription}
              setViewCreateCategory={setViewCreateCategory}
              handleSubmitNewCategory={handleSubmitNewCategory}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
