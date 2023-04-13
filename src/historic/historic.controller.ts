/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CreateHistoricUseCase } from './useCases/CreateHistoricUseCase';
import { ListHistoricUseCase } from './useCases/ListHistoricUseCase';
import { CreateHistoricDTO } from './dtos/CreateHistoricDTO';

import { AuthGuard } from '../guards/auth.guard';
import { Replace } from 'src/helpers/Replace';

@Controller('/historic')
export class HistoricController {
  constructor(
    private createHistoricUseCase: CreateHistoricUseCase,
    private listHistoricUseCase: ListHistoricUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createHistoric(
    @Request() request,
    @Body() createHistoricDTO: Replace<CreateHistoricDTO, { userId?: string }>,
  ) {
    const dataCreateHistoric = {
      ...createHistoricDTO,
      userId: request.userId,
    };

    const historic = await this.createHistoricUseCase.execute(
      dataCreateHistoric,
    );

    return historic;
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async listHistoricUser(@Request() request) {
    const userId = request.userId;

    const listHistoric = await this.listHistoricUseCase.execute(userId);

    return listHistoric;
  }
}
