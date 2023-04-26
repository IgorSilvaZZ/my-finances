import { ArrowRight } from "@phosphor-icons/react";

interface CardHistoryProps {
  name: string;
  value: number;
  date: string;
}

export const CardHistory = ({ name, value, date }: CardHistoryProps) => {
  return (
    <div className='h-12 w-[1000px] p-2 flex items-center justify-around gap-3 rounded-xl bg-zinc-900 cursor-pointer text-white'>
      <div className='w-9 h-9 flex items-center justify-center rounded-full bg-violet-600'>
        <span className='font-bold'>$</span>
      </div>
      <span className='font-semibold'>{name}</span>
      <span className='font-semibold'>{date}</span>
      <span className='font-bold'>R$ {value.toFixed(2)}</span>
      <span>
        <ArrowRight size={24} className='opacity-50' />
      </span>
    </div>
  );
};
