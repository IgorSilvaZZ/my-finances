/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { HistoricModule } from './historic/historic.module';

@Module({
  imports: [DatabaseModule, UsersModule, HistoricModule],
})
export class AppModule {}
