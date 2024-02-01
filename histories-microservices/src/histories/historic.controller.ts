import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ListHistoriesByUserIdUseCase } from './useCases/ListHistoriesByUserIdUseCase';
import { ListHistoriesByUserIdDTO } from './dtos/ListHistoriesByUserIdDTO';

@Controller()
export class HistoricController {
  constructor(
    private listHistoriesByUserIdUseCase: ListHistoriesByUserIdUseCase,
  ) {}

  @MessagePattern('histories-users')
  async listHistoriesByUserId(@Payload() { userId }: ListHistoriesByUserIdDTO) {
    const historiesUser = await this.listHistoriesByUserIdUseCase.execute(
      userId,
    );

    return historiesUser;
  }
}
