import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UsersController } from './users.controller';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { jwtConstants } from './constants/auth.constant';
import { AuthenticateUserUseCase } from './useCases/AuthenticateUserUseCase';
/* import { UpdateBalanceUseCase } from './useCases/UpdateBalanceUseCase'; */

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: ['localhost:9092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'users-consumer',
          },
        },
      },
    ]),
    JwtModule.register({
      global: jwtConstants.options.global,
      secret: jwtConstants.options.secret,
      signOptions: { expiresIn: jwtConstants.options.signOptions.expiresIn },
    }),
  ],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase /* UpdateBalanceUseCase */,
  ],
})
export class UsersModule {}
