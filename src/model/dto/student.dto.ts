import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  IsObject,
} from 'class-validator';

export class CreateStudentDTO {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  roleNumber: number;

  @IsString()
  @IsNotEmpty()
  class: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNumber()
  @IsNotEmpty()
  marks: number;
}

export class FindStudentByIdDTO {
  @IsObject()
  _id: string;
}

export class UpdateStudentByIdDTO {
  @IsObject()
  _id: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  roleNumber: number;

  @IsString()
  @IsNotEmpty()
  class: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNumber()
  @IsNotEmpty()
  marks: number;
}

export class DeleteStudentByIdDTO {
  @IsObject()
  _id: string;
}
