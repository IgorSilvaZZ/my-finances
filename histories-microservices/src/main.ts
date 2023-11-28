import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'histories',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'histories-consumer',
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
