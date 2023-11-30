export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  balance?: number;
  avatarUrl?: string;
}
