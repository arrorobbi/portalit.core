// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT, 10) || 5432,
  username: process.env.PG_USER || 'your_username',
  password: process.env.PG_PASSWORD || 'your_password',
  database: process.env.PG_DB_NAME || 'your_database',
  entities: [__dirname + '/../**/*.model{.ts,.js}'],
  synchronize: true, // Use DB_SYNC to toggle sync
  // Enable SSL
  // ssl: {
  //   rejectUnauthorized: false, // Set to true if you want to validate the certificate
  // },
  // Enable logging for debugging
  logging: true,
  // Optional: Specify which logs you want to see
  logger: 'advanced-console', // You can also use 'simple-console', 'file', or 'debug
};
console.log(typeOrmConfig);
