import { Length, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @Length(2, 20)
  title: string;

  @IsNotEmpty()
  content: string;
}
