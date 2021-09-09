import { Length, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @Length(2, 50)
  title: string;

  @IsNotEmpty()
  content: string;
}
