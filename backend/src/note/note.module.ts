import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { CaslModule } from '../casl/casl.module';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [CaslModule],
})
export class NoteModule {}
