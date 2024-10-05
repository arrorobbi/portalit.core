import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from 'src/content/content.controller';
import { ContentService } from 'src/content/content.service';
import { EventsGateway } from 'src/misc/gateway';
import { Content } from 'src/models/content.model';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  providers: [ContentService, EventsGateway],
  controllers: [ContentController],
})
export class ContentModule {}
