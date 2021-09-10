import { Role } from '../../roles/role.enum';

export class User {
  userId: string;
  username: string;
  password: string;
  roles: Role[];
}
