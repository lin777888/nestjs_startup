import { Controller, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

export const OptionalJwtAuth = ( isPublic = false ) => {
  const list = [];

  if(!isPublic){
    list.push(UseGuards(AuthGuard));
    list.push(ApiBearerAuth());
  }

  return applyDecorators(...list);
};

