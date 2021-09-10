import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password) {
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }

      return null;
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<{ success: boolean; message: string }> {
    const createdUser = await this.usersService.createUser(createUserDto);
    if (!createdUser) {
      return {
        success: false,
        message: 'Username not available',
      };
    } else {
      return {
        success: true,
        message: 'User successfully created',
      };
    }
  }
}
