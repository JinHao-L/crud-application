import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

describe('NoteController', () => {
  let controller: NoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService],
    }).compile();

    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST / should create note and return all notes', () => {
    const notes = controller.create({
      title: 'New note 2',
      content: 'Newly created note',
    });
    expect(notes).toHaveLength(3);
  });

  it('GET / should return all notes', () => {
    const notes = controller.findAll();
    expect(notes).toHaveLength(2);
  });

  it('GET / with query keyword should return specific notes', () => {
    const adminNotes = controller.findAll('Admin');
    expect(adminNotes).toHaveLength(1);
    expect(adminNotes[0].title.includes('Admin')).toBeTruthy();
  });

  it('GET /:id should return note with specified id', () => {
    const adminNote = controller.findOne(0);
    expect(adminNote.id).toEqual(0);
  });

  it('PUT /:id should update note', () => {
    const adminNote = controller.update(0, {
      title: 'New title',
    });
    expect(adminNote.id).toEqual(0);
    expect(adminNote.title).toEqual('New title');
  });

  it('DELETE /:id using invalid id should return false', () => {
    const adminNote = controller.remove(999);
    expect(adminNote).toBeFalsy();
  });

  it('DELETE /:id using valid id should return false', () => {
    const adminNote = controller.remove(1);
    expect(adminNote).toBeTruthy();
  });
});
