import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/middlewares/error';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true, // Enable buffer logs for performance
  });
  // Enable CORS
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe()); // validation DTO and interface
  app.useGlobalFilters(new AllExceptionsFilter()); // error middleware
  // Use the Pino logger
  app.useLogger(app.get(Logger));

  // Serve static files from the public directory
  app.useStaticAssets(join(__dirname, '.', 'public'));

  await app.listen(4021);
}
bootstrap();
