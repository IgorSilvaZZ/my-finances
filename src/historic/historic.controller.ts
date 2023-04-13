/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';

import { CreateHistoricUseCase } from './useCases/CreateHistoricUseCase';
import { CreateHistoricDTO } from './dtos/CreateHistoricDTO';

import { AuthGuard } from '../guards/auth.guard';
import { Replace } from 'src/helpers/Replace';

@Controller('/historic')
export class HistoricController {
  constructor(private createHistoricUseCase: CreateHistoricUseCase) {}

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
}
