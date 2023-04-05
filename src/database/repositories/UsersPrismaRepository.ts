/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { User as UserPrisma } from '@prisma/client';

import { CreateUserDTO } from 'src/users/dtos/CreateUserDTO';
import { UsersRepository } from '../../users/repositories/UsersRepository';
import { PrismaService } from '../database.service';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateUserDTO): Promise<UserPrisma> {
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        balance: 0,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserPrisma | null> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
