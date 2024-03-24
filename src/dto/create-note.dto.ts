import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsString()
  status: string;

  @IsString()
  author: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
