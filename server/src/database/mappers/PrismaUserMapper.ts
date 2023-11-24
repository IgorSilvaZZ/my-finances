import { IUser } from '../../users/interfaces/User';

export class PrismaUserMapper {
  static toPrisma(user: IUser) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatarUrl: user.avatarUrl,
      balance: user.balance,
    };
  }
}
