import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDate,
} from 'class-validator';
import { UUID } from 'crypto';
// readonly is used fore immutanibility that couldn't modify after initialization

export interface IntUser {
  // interface is validation for internal source, which mean will be validate data or response each method or functio
  readonly id?: Number;
  readonly name: String;
  readonly email: String;
  readonly password: String;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class CreateUserDTO {
  // DTO is for validating request body
  @IsOptional()
  @IsInt()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly confirmPassword: string;

  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;
}

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
