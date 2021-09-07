import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteService],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createNote should increase note length', () => {
    const notes = service.create({
      title: 'New note 2',
      content: 'Newly created note',
    });
    expect(notes).toHaveLength(3);
  });

  it('getAll should return 2 notes', () => {
    const notes = service.getAll();
    expect(notes).toHaveLength(2);
  });

  it('findByKeyword should return note with keyword', () => {
    const adminNotes = service.findByKeyword('Admin');
    expect(adminNotes).toHaveLength(1);
    expect(adminNotes[0].title.includes('Admin')).toBeTruthy();
  });

  it('findByKeyword should return multiple note with keyword', () => {
    const adminNotes = service.findByKeyword('Hello');
    expect(adminNotes).toHaveLength(2);
    expect(adminNotes[0].content.includes('Hello')).toBeTruthy();
    expect(adminNotes[1].title.includes('Hello')).toBeTruthy();
  });

  it('findOne should return note with specified id', () => {
    const adminNote = service.findOne(0);
    expect(adminNote.id).toEqual(0);
  });

  it('update should return updated note', () => {
    const adminNote = service.update(0, {
      title: 'New title',
      content: 'New content',
    });
    expect(adminNote.id).toEqual(0);
    expect(adminNote.title).toEqual('New title');
    expect(adminNote.content).toEqual('New content');
  });

  it('remove note with invalid id should return false', () => {
    const adminNote = service.remove(999);
    expect(adminNote).toBeFalsy();
  });

  it('remove note with valid id should return true', () => {
    const adminNote = service.remove(1);
    expect(adminNote).toBeTruthy();
  });
});
