import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(payload: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      payload.password,
      +process.env.SALT_ROUND,
    );
    const newUser = this.usersRepository.create({
      ...payload,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<[User[], number]> {
    return await this.usersRepository.findAndCount();
  }

  async findOne(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findByname(name: string): Promise<User[]> {
    return await this.usersRepository.find({
      where: {
        name: name,
      },
    });
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
