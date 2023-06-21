export interface IUserState {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  avatarUrl: string;
  token: string | null;
}

export interface IUserPayload {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    balance: number;
    avatarUrl: string;
  };
  token: string;
}
