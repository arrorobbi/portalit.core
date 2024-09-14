import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config'; // Import TypeORM config
import { UsersModule } from './modules/user.module';
import { DataSource } from 'typeorm';
import { UploadController } from './misc/multer';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'), // path to the public folder
    }),
    UsersModule,
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
