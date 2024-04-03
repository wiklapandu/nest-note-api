import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsString()
  color?: string;

  @IsString()
  status: string;

  @IsDate()
  updated_at: Date;
}
