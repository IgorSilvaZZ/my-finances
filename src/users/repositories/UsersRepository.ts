/* eslint-disable prettier/prettier */
import { User as UserPrisma } from '@prisma/client';

import { CreateUserDTO } from '../dtos/CreateUserDTO';

export abstract class UsersRepository {
  abstract create(data: CreateUserDTO): Promise<UserPrisma>;
  abstract findByEmail(email: string): Promise<UserPrisma | null>;
}
