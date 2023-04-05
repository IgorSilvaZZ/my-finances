/* eslint-disable prettier/prettier */

import { Controller, Body, Post } from '@nestjs/common';

import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { CreateUserDTO } from './dtos/CreateUserDTO';

@Controller('/users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.createUserUseCase.execute(createUserDTO);

    return user;
  }
}
