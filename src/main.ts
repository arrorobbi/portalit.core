import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Enable buffer logs for performance
  });

  // Use the Pino logger
  app.useLogger(app.get(Logger));
  await app.listen(4021);
}
bootstrap();
