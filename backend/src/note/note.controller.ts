import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../common/guard/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { User as UserEntity } from '../users/entities/user.entity';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@User() user: UserEntity, @Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto, user);
  }

  @Get()
  findAll(@User() user: UserEntity, @Query('q') keyword?: string) {
    return keyword
      ? this.noteService.findByKeyword(keyword, user)
      : this.noteService.getAll(user);
  }

  @Get(':id')
  findOne(@User() user: UserEntity, @Param('id', ParseIntPipe) id: number) {
    return this.noteService.findOne(id, user);
  }

  @Put(':id')
  update(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.noteService.update(id, updateNoteDto, user);
  }

  @Delete(':id')
  remove(@User() user: UserEntity, @Param('id', ParseIntPipe) id: number) {
    return this.noteService.remove(id, user);
  }
}
