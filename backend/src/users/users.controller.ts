import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guard/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { Roles } from '../common/decorators/role.decorator';
import { RoleEnum } from '../common/types/role.enum';
import { RolesGuard } from '../common/guard/roles.guard';

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
