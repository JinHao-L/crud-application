import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { NoteService } from './note.service';
import { CaslModule } from '../casl/casl.module';

describe('NoteService', () => {
  let service: NoteService;
  let adminUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteService, CaslAbilityFactory],
      imports: [CaslModule],
    }).compile();

    service = module.get<NoteService>(NoteService);
    adminUser = {
      username: 'tester',
      userId: 'tester',
      password: null,
      roles: ['admin' as any],
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createNote should increase note length', () => {
    const notes = service.create(
      {
        title: 'New note 2',
        content: 'Newly created note',
      },
      adminUser,
    );
    expect(notes).toHaveLength(3);
  });

  it('getAll should return 2 notes', () => {
    const notes = service.getAll(adminUser);
    expect(notes).toHaveLength(2);
  });

  it('findByKeyword should return note with keyword', () => {
    const adminNotes = service.findByKeyword('Admin', adminUser);
    expect(adminNotes).toHaveLength(1);
    expect(adminNotes[0].title.includes('Admin')).toBeTruthy();
  });

  it('findByKeyword should return multiple note with keyword', () => {
    const adminNotes = service.findByKeyword('note', adminUser);
    expect(adminNotes).toHaveLength(2);
    expect(adminNotes[0].content.includes('note')).toBeTruthy();
    expect(adminNotes[1].title.includes('note')).toBeTruthy();
  });

  it('findOne should return note with specified id', () => {
    const adminNote = service.findOne(0, adminUser);
    expect(adminNote.id).toEqual(0);
  });

  it('update should return updated note', () => {
    const adminNote = service.update(
      0,
      {
        title: 'New title',
        content: 'New content',
      },
      adminUser,
    );
    expect(adminNote.id).toEqual(0);
    expect(adminNote.title).toEqual('New title');
    expect(adminNote.content).toEqual('New content');
  });

  it('remove note with invalid id to throw error', () => {
    expect(() => service.remove(999, adminUser)).toThrowError();
  });

  it('remove note with valid id should return true', () => {
    const adminNote = service.remove(1, adminUser);
    expect(adminNote).toBeTruthy();
  });
});
