import { NestFactory } from '@nestjs/core';

import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/middlewares/error';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true, // Enable buffer logs for performance
  });
  // Enable CORS
  app.useStaticAssets(join(__dirname, '..', 'public')); // Serve static files from 'public'
  app.enableCors({
    origin: '*', // Allow all origins (not recommended for production)
  });

  app.useGlobalPipes(new ValidationPipe()); // validation DTO and interface
  app.useGlobalFilters(new AllExceptionsFilter()); // error middleware
  // Use the Pino logger
  app.useLogger(app.get(Logger));

  await app.listen(4021);
}
bootstrap();
