import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';


@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        // Pino options here
        transport: {
          target: 'pino-pretty', // Use pino-pretty for human-readable logging in development
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname', // Customize output fields
          },
        },
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
