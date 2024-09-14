import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/middlewares/error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Enable buffer logs for performance
  });

  app.useGlobalPipes(new ValidationPipe()); // validation DTO and interface
  app.useGlobalFilters(new AllExceptionsFilter()); // error middleware
  // Use the Pino logger
  app.useLogger(app.get(Logger));
  await app.listen(4021);
}
bootstrap();
