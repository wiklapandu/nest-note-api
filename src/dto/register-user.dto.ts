import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterNoteDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at?: Date;
}
