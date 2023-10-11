/* eslint-disable prettier/prettier */

import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { CategoryRepositoryInMemory } from '../../../test/repositories/CategoryRepositoryInMemory';
import { makeUser } from '../../../test/factories/user-factory';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from './CreateUserUseCase';

import { jwtConstants } from '../constants/auth.constant';

let usersRepositoryInMemory: UsersInMemoryRepository;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let jwtService: JwtService;

describe('Authentication User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersInMemoryRepository();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory, categoryRepositoryInMemory);
    jwtService = new JwtService(jwtConstants.options);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      jwtService,
    );
  });

  it('should be able authenticate a user', async () => {
    const user = makeUser();

    await createUserUseCase.execute(user);

    const token = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).toBeTruthy();
  });

  it('should not be able authenticate a user incorrect email', async () => {
    const user = makeUser();

    await createUserUseCase.execute(user);

    expect(async () => {
      return authenticateUserUseCase.execute({
        email: 'email incorrect',
        password: user.password,
      });
    }).rejects.toThrow(UnauthorizedException);
  });

  it('should not be able authenticate a user incorrect password', async () => {
    const user = makeUser();

    await createUserUseCase.execute(user);

    expect(async () => {
      return authenticateUserUseCase.execute({
        email: user.email,
        password: 'password incorrect',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
