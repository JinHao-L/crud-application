import { UsersService } from 'src/users/users.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // role based authorization
  @Get()
  @Roles(Role.Admin)
  getUsers(@Query('name') keyword?: string) {
    return this.usersService.getList(keyword);
  }
}
