export interface IHistoric {
  id: string;
  description: string;
  categoryId: string;
  value: number;
  type: string;
  isExit: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
