import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { Roles } from '../roles/role.decorator';
import { RoleEnum } from '../roles/role.enum';
import { RolesGuard } from '../guard/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // role based authorization
  @Get()
  @Roles(RoleEnum.Admin)
  getUsers(@Query('name') keyword?: string) {
    return this.usersService.getList(keyword);
  }
}
