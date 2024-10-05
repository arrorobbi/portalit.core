// content.controller.ts
import { CreateContentDTO, IntContent } from 'src/validators/content.validator';
import { ContentService } from './content.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Res,
  Next,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { Content } from 'src/models/content.model';
import { NotFoundError } from 'src/errors';
import { EventsGateway } from 'src/misc/gateway';

@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Get()
  async findAll(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result: [Content[], number] = await this.contentService.findAll();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: {
          count: result[1],
          payload: result[0],
        },
      });
    } catch (error) {
      next(error);
    }
  }

  @Get(':title')
  async findOne(
    @Param('title') title: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<Response> {
    try {
      const content = await this.contentService.findOne(title);
      if (!content) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'Content not found',
        });
      }
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: content,
      });
    } catch (error) {
      next(error);
    }
  }

  @Get('parcid/:id')
  async findOneId(
    @Param('id') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<Response> {
    try {
      const content: Content | null = await this.contentService.findOneId(id);
      if (!content) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'Content not found',
        });
      }

      // Map Content entity to IntContent DTO
      const result: IntContent = {
        id: content.id,
        title: content.title,
        content: content.content,
        createdAt: content.createdAt,
        updatedAt: content.updatedAt,
      };

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @Post()
  async create(
    @Body() ContentDTO: CreateContentDTO,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const content = await this.contentService.create(ContentDTO);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: content,
      });
    } catch (error) {
      next(error);
    }
  }

  @Delete('delid/:id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const findData: Content = await this.contentService.findOneId(id);
      if (findData === null) throw new NotFoundError('Data Not Found');
      await this.contentService.delete(findData.id);
      return res.status(HttpStatus.NO_CONTENT).json({
        status: HttpStatus.NO_CONTENT,
        message: 'Content deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
