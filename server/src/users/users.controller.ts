import {
  Controller,
  Inject,
  Body,
  Post,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateUserDTO } from './dtos/CreateUserDTO';
import { AuthenticateUserDTO } from './dtos/AuthenticateUserDTO';

import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { AuthenticateUserUseCase } from './useCases/AuthenticateUserUseCase';

@Controller('/users')
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post('/')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    this.createUserUseCase.execute(createUserDTO);
  }

  @Post('/login')
  async authenticate(@Body() authenticateUserDTO: AuthenticateUserDTO) {
    const { token } = await this.authenticateUserUseCase.execute(
      authenticateUserDTO,
    );

    return { token };
  }

  /*

  @UseGuards(AuthGuard)
  @Patch('/updateBalance')
  async updateBalance(
    @Request() request,
    @Body() updateBalanceDTO: UpdateBalanceDTO,
  ) {
    const updatedBalance = await this.updateBalanceUseCase.execute({
      idUser: request.userId,
      balance: updateBalanceDTO.balance,
    });

    return {
      balance: updatedBalance,
    };
  } */
}
