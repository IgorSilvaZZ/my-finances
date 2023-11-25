import { ICategoriesUser } from "@/interfaces/ICategoriesUser.interface";
import { IHistories } from "@/interfaces/IHistories.interface";

export interface IUserState {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  avatarUrl: string;
  token: string | null;
  histories: IHistories | [] 
  categories: ICategoriesUser | []
}

export interface IUserPayload {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    balance: number;
    avatarUrl: string;
    histories: IHistories;
    categories: ICategoriesUser;
  };
  token: string;
}
