/* eslint-disable prettier/prettier */

export interface CreateHistoricDTO {
  description: string;
  value: number;
  type: string;
  isExit: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
