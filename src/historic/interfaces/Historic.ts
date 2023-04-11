/* eslint-disable prettier/prettier */

export interface IHistoric {
  id: string;
  description: string;
  value: number;
  type: string;
  isExit: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
