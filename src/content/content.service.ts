import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/models/content.model';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(payload: Content): Promise<Content> {
    return this.contentRepository.save(payload);
  }

  async findAll(): Promise<[Content[], number]> {
    return await this.contentRepository.findAndCount();
  }

  async findOne(title: string): Promise<Content | null> {
    return await this.contentRepository.findOneBy({ title });
  }
}
