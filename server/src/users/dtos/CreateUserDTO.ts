export interface CreateUserDTO {
  name: string;
  email: string;
  balance: number;
  password: string;
  avatarUrl?: string;
}
