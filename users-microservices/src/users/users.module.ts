import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DatabaseModule } from '../database/database.module';
import { UserControler } from './users.controller';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'CATEGORIES_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'categories',
            brokers: ['localhost:9092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'categories-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [UserControler],
  providers: [CreateUserUseCase],
})
export class UsersModule {}
