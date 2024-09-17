import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { UsersModule } from './user.module';

import { ContentModule } from './content.module';
import { UploadController } from 'src/upload/upload.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Adjusted to point to your public folder in the root
      serveRoot: '/public', // Serve files under /public path
    }),
    UsersModule,
    ContentModule,
    TypeOrmModule.forRoot(typeOrmConfig), // Use the imported config
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
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
