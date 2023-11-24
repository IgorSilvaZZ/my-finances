import { User as UserPrisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { CreateUserDTO } from '../../src/users/dtos/CreateUserDTO';
import { UsersRepository } from '../../src/users/repositories/UsersRepository';
import { IUser } from '../../src/users/interfaces/User';
import { PrismaUserMapper } from '../../src/database/mappers/PrismaUserMapper';

export class UsersInMemoryRepository implements UsersRepository {
  public users: IUser[] = [];

  async create({
    name,
    email,
    password,
    balance,
  }: CreateUserDTO): Promise<UserPrisma> {
    const dataUser: IUser = {
      id: uuid(),
      name,
      balance: balance,
      email,
      password,
    };

    this.users.push(dataUser);

    return PrismaUserMapper.toPrisma(dataUser);
  }

  async findByEmail(email: string): Promise<UserPrisma | null> {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toPrisma(user);
  }

  async findById(id: string): Promise<UserPrisma | null> {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toPrisma(user);
  }

  async updateBalance(id: string, balance: number): Promise<number> {
    const user = this.users.find(user => user.id === id);

    user.balance = balance;

    return user.balance;
  }
}
