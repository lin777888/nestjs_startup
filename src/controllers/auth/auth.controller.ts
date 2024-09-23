import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserPayload } from 'src/auth/user-payload.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { Api } from 'src/decorators/api.decorator';
import { OptionalJwtAuth } from 'src/decorators/optional-jwt-auth.decorator';

@Api({
  path: 'auth',
  isPublic: true
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  @OptionalJwtAuth()
  findAll(@User() user: UserPayload) {
    return user;
  }
}
