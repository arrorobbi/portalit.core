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
import { NextFunction, Response, Request } from 'express';
import { Content } from 'src/models/content.model';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}
  @Get()
  async findAll(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result: [Content[], number] = await this.contentService.findAll();
      console.log(result);

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
  findOne(@Param('title') title: string): Promise<Content> {
    return this.contentService.findOne(title);
  }

  @Post()
  async create(
    @Body() ContentDTO: CreateContentDTO,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result: IntContent = await this.contentService.create(ContentDTO);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
