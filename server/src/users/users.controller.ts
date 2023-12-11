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
import { CreateUserUseCase } from './useCases/CreateUserUseCase';

@Controller('/users')
export class UsersController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    this.createUserUseCase.execute(createUserDTO);
  }

  /*

  @Post('/login')
  async authenticate(@Body() authenticateUserDTO: AuthenticateUserDTO) {
    const { user, token } = await this.authenticateUserUseCase.execute(
      authenticateUserDTO,
    );

    return { user, token };
  }

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
