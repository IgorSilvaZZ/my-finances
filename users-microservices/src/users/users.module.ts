import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
})
export class UsersModule {}
