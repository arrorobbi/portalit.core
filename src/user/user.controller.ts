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
import { UsersService } from '../user/user.service';
import { User } from '../models/user.model';
import { NextFunction, Response, Request } from 'express';
import { CreateUserDTO, IntUser } from 'src/validators/user.validator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result: [User[], number] = await this.userService.findAll();
      console.log(result);

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  @Get(':email')
  findOne(@Param('email') email: string): Promise<User> {
    return this.userService.findOne(email);
  }

  @Post('register')
  async create(
    @Body() UserDTO: CreateUserDTO,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result: IntUser = await this.userService.create(UserDTO);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
