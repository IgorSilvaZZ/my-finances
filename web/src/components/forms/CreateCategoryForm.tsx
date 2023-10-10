import { ArrowLeft, Check } from "@phosphor-icons/react";

interface CreateCategoryFormProps {
  newCategoryDescription: string;
  setNewCategoryDescription: (descriptionCategory: string) => void;
  handleSubmitNewCategory: (event: React.FormEvent<HTMLFormElement>) => void;
  setViewCreateCategory: (viewCreateCategory: boolean) => void;
}

export const CreateCategoryForm = ({
  newCategoryDescription,
  setNewCategoryDescription,
  setViewCreateCategory,
  handleSubmitNewCategory,
}: CreateCategoryFormProps) => {
  return (
    <form
      className='flex flex-col justify-center gap-4 w-full mt-5'
      onSubmit={handleSubmitNewCategory}
    >
      <button
        className='text-violet-600'
        onClick={() => setViewCreateCategory(false)}
      >
        <ArrowLeft size={22} />
      </button>

      <label
        htmlFor='description'
        className='font-semibold leading-tight text-zinc-500'
      >
        Qual vai ser o nome da nova categoria?
      </label>

      <input
        type='text'
        id='category'
        name='category'
        value={newCategoryDescription}
        placeholder='ex.: Viagem, Domestico, Lazer...'
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline focus:ring-2 focus:ring-violet-600'
        autoFocus
        onChange={(e) => setNewCategoryDescription(e.target.value)}
      />

      <span className='text-zinc-600 text-xs mt-2 font-medium'>
        Esse nome é totalmente livre para colocar o que desejar, as categorias
        são separadas por usuarios. Então personalize da forma que você quiser.
      </span>

      <button
        type='submit'
        className='mt-6 rounded-lg p-3 flex gap-3 items-center justify-center font-semibold bg-violet-800 text-white transition-colors hover:bg-violet-900'
      >
        <Check size={20} weight='bold' />
        Criar
      </button>
    </form>
  );
};
