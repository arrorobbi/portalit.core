import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDate,
} from 'class-validator';
// readonly is used fore immutanibility that couldn't modify after initialization

export interface IntContent {
  // interface is validation for internal source, which mean will be validate data or response each method or functio
  readonly id?: string;
  readonly title: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class CreateContentDTO {
  // DTO is for validating request body
  @IsOptional()
  @IsInt()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;
}
