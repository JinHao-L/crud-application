import {
  Ability,
  AbilityClass,
  AbilityBuilder,
  InferSubjects,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { RoleEnum } from '../common/types/role.enum';
import { Note } from '../note/entities/note.entity';
import { User } from '../users/entities/user.entity';
import { Action } from './action.enum';

type Subjects = InferSubjects<typeof Note | typeof User | 'all'>;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.roles.includes(RoleEnum.Admin)) {
      can(Action.Manage, 'all'); // read-write access to Notes
      can(Action.Manage, Note, {}); // read-write access to Notes
    } else {
      can(Action.Read, Note, {}); // read-only access to Note
      can(Action.Create, Note, {}); // create access to User
    }

    can(Action.Update, Note, { ownerId: user.userId });
    can(Action.Delete, Note, { ownerId: user.userId });
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
