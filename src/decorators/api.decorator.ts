import { Controller, UseGuards, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { OptionalJwtAuth } from './optional-jwt-auth.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

export const Api = ({ path = '', isPublic = false, tag = null }) => {
  const list = [Controller(path)];

  list.push(OptionalJwtAuth(isPublic));
  list.push(UseInterceptors(LoggingInterceptor));


  if (tag) list.push(ApiTags(tag));
  else {
    // path 轉換成駝峰式給到tag
    const tag = path.replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase());
    list.push(ApiTags(tag));
  }

  return applyDecorators(...list);
};

