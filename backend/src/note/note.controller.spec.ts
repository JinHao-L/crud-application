import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { CaslModule } from '../casl/casl.module';
import { User } from '../users/entities/user.entity';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

describe('NoteController', () => {
  let controller: NoteController;
  let adminUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService, CaslAbilityFactory],
      imports: [CaslModule],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    adminUser = {
      username: 'tester',
      userId: 'tester',
      password: null,
      roles: ['admin' as any],
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST / should create note and return all notes', () => {
    const notes = controller.create(adminUser, {
      title: 'New note 2',
      content: 'Newly created note',
    });
    expect(notes).toHaveLength(3);
  });

  it('GET / should return all notes', () => {
    const notes = controller.findAll(adminUser);
    expect(notes).toHaveLength(2);
  });

  it('GET / with query keyword should return specific notes', () => {
    const adminNotes = controller.findAll(adminUser, 'Admin');
    expect(adminNotes).toHaveLength(1);
    expect(adminNotes[0].title.includes('Admin')).toBeTruthy();
  });

  it('GET /:id should return note with specified id', () => {
    const adminNote = controller.findOne(adminUser, 0);
    expect(adminNote.id).toEqual(0);
  });

  it('PUT /:id should update note', () => {
    const adminNote = controller.update(adminUser, 0, {
      title: 'New title',
    });
    expect(adminNote.id).toEqual(0);
    expect(adminNote.title).toEqual('New title');
  });

  it('DELETE /:id using invalid id should return false', () => {
    expect(() => controller.remove(adminUser, 999)).toThrowError();
  });

  it('DELETE /:id using valid id should return false', () => {
    const adminNote = controller.remove(adminUser, 1);
    expect(adminNote).toBeTruthy();
  });
});
