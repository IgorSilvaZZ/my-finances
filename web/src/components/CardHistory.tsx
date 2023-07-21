import numeral from "numeral";
import dayjs from "dayjs";

import { ArrowRight } from "@phosphor-icons/react";

interface CardHistoryProps {
  id: string;
  description: string;
  value: number;
  createdAt: string;
  isExit: boolean;
}

export const CardHistory = ({
  id,
  description,
  value,
  isExit,
  createdAt,
}: CardHistoryProps) => {
  const dateFormat = dayjs(createdAt).format("DD/MM/YYYY");

  const valueFormat = `R$ ${numeral(value).format("0,0")}`;

  return (
    <div
      className='h-12 w-[1000px] p-2 flex items-center justify-around gap-3 rounded-xl bg-zinc-900 text-white'
      key={id}
    >
      <div className='w-9 h-9 flex items-center justify-center rounded-full bg-violet-600'>
        <span className='font-bold'>$</span>
      </div>
      <div className='w-52 text-ellipsis overflow-hidden text-center'>
        <span className='font-semibold'>{description}</span>
      </div>
      <div className='w-24 text-center'>
        <span className='font-semibold'>{dateFormat}</span>
      </div>
      <div className='w-40 text-center'>
        <span className='font-bold'>{valueFormat}</span>
      </div>
      <span className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity'>
        <ArrowRight size={24} className='opacity-50' />
      </span>
    </div>
  );
};
