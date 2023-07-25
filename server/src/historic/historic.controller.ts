/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
  Logger,
} from '@nestjs/common';

import { CreateHistoricUseCase } from './useCases/CreateHistoricUseCase';
import { ListHistoricUseCase } from './useCases/ListHistoricUseCase';
import { FindByIdHistoricUseCase } from './useCases/FindByIdHistoricUseCase';

import { CreateHistoricDTO } from './dtos/CreateHistoricDTO';

import { AuthGuard } from '../guards/auth.guard';
import { Replace } from 'src/helpers/Replace';

@Controller('/historic')
export class HistoricController {
  constructor(
    private createHistoricUseCase: CreateHistoricUseCase,
    private listHistoricUseCase: ListHistoricUseCase,
    private findByIdHistoricUseCase: FindByIdHistoricUseCase,
  ) {}

  logger = new Logger(HistoricController.name);

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

    const { historic, newBalance } = await this.createHistoricUseCase.execute(
      dataCreateHistoric,
    );

    return { historic, newBalance };
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async listHistoricUser(@Request() request) {
    const userId = request.userId;

    const listHistoric = await this.listHistoricUseCase.execute(userId);

    return listHistoric;
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async listHistoric(@Param('id') id: string) {
    this.logger.log(id);

    const historic = await this.findByIdHistoricUseCase.execute(id);

    return historic;
  }
}
