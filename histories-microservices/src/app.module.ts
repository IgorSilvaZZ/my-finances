import { Module } from '@nestjs/common';
import { HistoriesModule } from './histories/histories.module';
@Module({
  imports: [HistoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
