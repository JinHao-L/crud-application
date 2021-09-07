import { Injectable } from '@nestjs/common';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  private counter = 2;
  private notes: Note[] = [
    {
      id: 0,
      title: 'Admin note',
      content:
        'Hello there, feel free to use this note service to share notes with anybody',
      createdAt: new Date(),
      owner: 'Admin',
    },
    {
      id: 1,
      title: 'Hello World (Again)',
      content: 'Thanks for using Note service',
      createdAt: new Date(),
      owner: 'Admin',
    },
  ];

  create(createNoteDto: CreateNoteDto): Note[] {
    const newNote = {
      id: this.counter++,
      title: createNoteDto.title,
      content: createNoteDto.content,
      createdAt: new Date(),
      owner: 'Admin',
    };
    this.notes = [...this.notes, newNote];
    return this.notes;
  }

  getAll(): Note[] {
    return this.notes;
  }

  findByKeyword(keyword: string): Note[] {
    return this.notes.filter((x) => {
      return x.title.includes(keyword) || x.content.includes(keyword);
    });
  }

  findOne(id: number): Note {
    return this.notes.find((x) => x.id === id);
  }

  update(id: number, updateNoteDto: UpdateNoteDto): Note {
    const idx = this.notes.findIndex((x) => x.id === id);
    if (idx === -1) {
      return null;
    }

    const newNote: Note = {
      ...this.notes[idx],
      title: updateNoteDto.title || this.notes[id].title,
      content: updateNoteDto.content || this.notes[id].content,
      updatedAt: new Date(),
    };

    this.notes[idx] = newNote;
    return newNote;
  }

  remove(id: number): boolean {
    const idx = this.notes.findIndex((x) => x.id === id);
    if (idx === -1) {
      return false;
    }

    this.notes.splice(idx, 1);
    return true;
  }
}
