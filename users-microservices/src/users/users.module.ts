import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from './constants/auth.constant';

import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { AuthenticateUserUseCase } from './useCases/AuthenticateUserUseCase';
import { UserController } from './users.controller';

import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: jwtConstants.options.global,
      secret: jwtConstants.options.secret,
      signOptions: { expiresIn: jwtConstants.options.signOptions.expiresIn },
    }),
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
      {
        name: 'HISTORIES_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'histories',
            brokers: ['localhost:9092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'histories-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [CreateUserUseCase, AuthenticateUserUseCase],
})
export class UsersModule {}
