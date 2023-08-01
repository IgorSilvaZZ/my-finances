import numeral from "numeral";
import dayjs from "dayjs";
import * as Tooltip from "@radix-ui/react-tooltip";

import { TrendUp, TrendDown } from "@phosphor-icons/react";

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
      <div className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity'>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>
              {isExit ? (
                <TrendDown size={24} className='opacity-50 text-red-500' />
              ) : (
                <TrendUp size={24} className='opacity-50 text-green-500' />
              )}
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className='w-52 rounded-md px-3 py-4 text-sm text-violet-700 bg-white'>
                {isExit ? (
                  <>
                    <b className='text-red-500'>Saida: </b> O valor descontado
                    do seu saldo atual é de R${" "}
                    <b className='text-red-500'>{valueFormat}</b> <br />
                  </>
                ) : (
                  <>
                    <b className='text-green-500'>Entrada: </b> O valor
                    acrescentado ao seu saldo atual é de R${" "}
                    <b className='text-green-500'>{valueFormat}</b> <br />
                  </>
                )}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
};
