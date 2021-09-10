import { User } from './../users/entities/user.entity';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Action } from '../casl/action.enum';

@Injectable()
export class NoteService {
  constructor(private readonly caslAbilityFactory: CaslAbilityFactory) {}

  private counter = 2;
  private notes: Note[] = [
    {
      id: 0,
      title: 'Admin note',
      content:
        'Hello there, feel free to use this note service to share notes with anybody',
      createdAt: new Date(),
      owner: 'Admin',
      ownerId: '000',
    },
    {
      id: 1,
      title: 'First note',
      content: 'Great app! I am a James, definitely not admin',
      createdAt: new Date(),
      owner: 'james',
      ownerId: '007',
    },
  ];

  create(createNoteDto: CreateNoteDto, user: User): Note[] {
    const ability = this.caslAbilityFactory.createAbility(user);
    if (ability.cannot(Action.Create, Note)) {
      throw new ForbiddenException('Not allowed to create note');
    }

    const newNote = {
      id: this.counter++,
      title: createNoteDto.title,
      content: createNoteDto.content,
      createdAt: new Date(),
      owner: user.username,
      ownerId: user.userId,
    };
    this.notes = [...this.notes, newNote];
    return this.notes;
  }

  getAll(user: User): Note[] {
    const ability = this.caslAbilityFactory.createAbility(user);

    return this.notes.filter((note) =>
      ability.can(Action.Read, new Note(note)),
    );
  }

  findByKeyword(keyword: string, user: User): Note[] {
    const ability = this.caslAbilityFactory.createAbility(user);
    return this.notes.filter((note) => {
      return (
        ability.can(Action.Read, new Note(note)) &&
        (note.title?.includes(keyword) || note.content?.includes(keyword))
      );
    });
  }

  findOne(id: number, user: User): Note {
    const ability = this.caslAbilityFactory.createAbility(user);
    const note = this.notes.find((note) => note.id === id);
    if (note === undefined) {
      throw new BadRequestException('id does not exist');
    }

    if (ability.cannot(Action.Read, new Note(note))) {
      throw new ForbiddenException('Forbidden resource');
    }

    return note;
  }

  update(id: number, updateNoteDto: UpdateNoteDto, user: User): Note {
    const idx = this.notes.findIndex((x) => x.id === id);
    if (idx === -1) {
      throw new BadRequestException('id does not exist');
    }

    const ability = this.caslAbilityFactory.createAbility(user);
    if (ability.cannot(Action.Update, new Note(this.notes[idx]))) {
      throw new ForbiddenException('Not allowed to modify note');
    }

    const newNote: Note = {
      ...this.notes[idx],
      title: updateNoteDto.title || this.notes[id].title,
      content: updateNoteDto.content || this.notes[id].content,
      updatedAt: new Date(),
      lastUpdatedBy: user.username,
    };

    this.notes[idx] = newNote;
    return newNote;
  }

  remove(id: number, user: User): boolean {
    const idx = this.notes.findIndex((x) => x.id === id);
    if (idx === -1) {
      throw new BadRequestException('id does not exist');
    }

    const ability = this.caslAbilityFactory.createAbility(user);
    if (ability.cannot(Action.Update, new Note(this.notes[idx]))) {
      throw new ForbiddenException('Not allowed to delete note');
    }

    this.notes.splice(idx, 1);
    return true;
  }
}
