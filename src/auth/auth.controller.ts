import { Body, Controller, Next, Post, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { BadRequestError } from 'src/errors/bad-request';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/validators/login.validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('login')
  async login(
    @Body() LoginDTO: LoginDTO,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { email, password } = LoginDTO;

      const foundUser = await this.userService.findOne(email);

      if (foundUser) {
        // bcrypt comparing with database
        const isValidPassword = await bcrypt.compare(
          password,
          foundUser.password,
        );

        const payload = {
          id: foundUser.id,
          email: foundUser.email,
        };
        // sign jwt for response
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: '24h',
        });

        return res.status(HttpStatus.CREATED).json({
          status: HttpStatus.CREATED,
          token: token,
        });
      } else {
        throw new BadRequestError('Wrong email or password');
      }
    } catch (error) {
      next(error);
    }
  }
}
