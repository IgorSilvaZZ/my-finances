/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { HistoricModule } from './historic/historic.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [DatabaseModule, UsersModule, HistoricModule, CategoriesModule],
})
export class AppModule {}
