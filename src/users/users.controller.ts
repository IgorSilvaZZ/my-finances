/* eslint-disable prettier/prettier */

import {
  Controller,
  Body,
  Post,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { AuthenticateUserDTO } from './dtos/AuthenticateUserDTO';
import { AuthenticateUserUseCase } from './useCases/AuthenticateUserUseCase';
import { AuthGuard } from './guard/auth.guard';
import { UpdateBalanceUseCase } from './useCases/UpdateBalanceUseCase';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    private readonly updateBalanceUseCase: UpdateBalanceUseCase,
  ) {}

  @Post('/')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.createUserUseCase.execute(createUserDTO);

    return user;
  }

  @Post('/login')
  async authenticate(@Body() authenticateUserDTO: AuthenticateUserDTO) {
    const token = await this.authenticateUserUseCase.execute(
      authenticateUserDTO,
    );

    return { token };
  }

  @UseGuards(AuthGuard)
  @Patch('/updateBalance')
  async updateBalance(@Request() request, @Body() balance: number) {
    const updatedBalance = await this.updateBalanceUseCase.execute({
      idUser: request.idUser,
      balance: balance,
    });

    return {
      balance: updatedBalance,
    };
  }
}
