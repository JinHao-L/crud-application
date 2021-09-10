import { Request } from 'express';
import {
  Controller,
  UseGuards,
  Post,
  Req,
  Body,
  BadRequestException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guard/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.signup(createUserDto);
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
