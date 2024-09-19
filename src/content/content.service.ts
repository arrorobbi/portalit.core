// content.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'src/errors';
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
    return await this.contentRepository.findAndCount({
      order: {
        title: 'ASC',
      },
    });
  }

  async findOne(title: string): Promise<Content | null> {
    return await this.contentRepository.findOneBy({ title });
  }

  async findOneId(id: string): Promise<Content | null> {
    return await this.contentRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    const result = await this.contentRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundError(`Content with id ${id} not found`);
    }
  }
}
