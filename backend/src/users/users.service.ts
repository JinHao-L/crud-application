import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { RoleEnum } from 'src/roles/role.enum';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: '007',
      username: 'admin',
      password: '$2a$12$wweSymfGwWXo.OwbJFGvEu7QV/OnI71GVKLsNqkJmjwrZi/FPJFB6',
      roles: [RoleEnum.Admin],
    },
    {
      userId: '007',
      username: 'james',
      password: '$2a$12$zFcfl6zJJGCvf.S49fsOzeGw77n1T1X4FYGOx/p7IJtRc9MGnZDB.',
      roles: [RoleEnum.User],
    },
  ];

  async getList(name?: string) {
    return this.users
      .filter((user) => user.username.includes(name || ''))
      .map((user) => {
        const { password, ...filteredUser } = user;
        return filteredUser;
      });
  }

  async findOneById(uid: string): Promise<User | undefined> {
    return this.users.find((user) => user.userId === uid);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async isUnusedUsername(username: string): Promise<boolean> {
    return this.users.findIndex((user) => user.username === username) === -1;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    if (!(await this.isUnusedUsername(user.username))) {
      return null;
    }
    const newUser: User = {
      userId: v4(),
      username: user.username,
      password: user.password,
      roles: [RoleEnum.User],
    };
    this.users.push(newUser);
    return newUser;
  }
}
