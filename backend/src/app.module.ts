import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesGuard } from './guard/roles.guard';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [NoteModule, AuthModule, UsersModule],
})
export class AppModule {}
