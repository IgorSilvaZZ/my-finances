export interface IUserState {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    balance: number;
    avatarUrl: string;
  } | null;
  token: string | null;
}
