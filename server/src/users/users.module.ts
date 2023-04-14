/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { DatabaseModule } from 'src/database/database.module';
import { jwtConstants } from './constants/auth.constant';
import { AuthenticateUserUseCase } from './useCases/AuthenticateUserUseCase';
import { UpdateBalanceUseCase } from './useCases/UpdateBalanceUseCase';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: jwtConstants.options.global,
      secret: jwtConstants.options.secret,
      signOptions: { expiresIn: jwtConstants.options.signOptions.expiresIn },
    }),
  ],
  controllers: [UsersController],
  providers: [CreateUserUseCase, AuthenticateUserUseCase, UpdateBalanceUseCase],
})
export class UsersModule {}
