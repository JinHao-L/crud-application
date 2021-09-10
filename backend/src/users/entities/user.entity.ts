import { RoleEnum } from '../../common/types/role.enum';

export class User {
  userId: string;
  username: string;
  password: string;
  roles: RoleEnum[];
}
