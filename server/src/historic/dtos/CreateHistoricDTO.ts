/* eslint-disable prettier/prettier */

export interface CreateHistoricDTO {
  description: string;
  value: number;
  type: string;
  userId: string;
  isExit: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
