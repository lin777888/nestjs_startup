import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  import moment from 'moment';
  import logger from 'fluent-logger';
  import _ from 'lodash';
  import { PrismaService } from 'src/prisma/prisma.service';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly prisma: PrismaService) {}
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();
      const now = moment();
      const user = request?.user;

      return next.handle().pipe(
        tap((responseBody) => {
            console.log('repsonseBody', responseBody);
            const seconds = moment().diff(now, 'seconds', true);

            const data = {
                CLASS: context.getClass()?.name,
                FUNCTION: context.getHandler()?.name,
                IP: request.ip,
                USER: user?.enName ?? '',
                EMPL_ID: user?.emplid ?? '',
                URL: request.url,
                PATH: request.path,
                METHOD: request.method,
                REQUEST_DATA: _.isEmpty(request?.body)
                  ? null
                  : JSON.stringify(request?.body),
                STATUS_CODE: response.statusCode,
                RESPONSE: JSON.stringify(responseBody)?.substring(0, 1000) ?? '',
                SECONDS: seconds,
            };

            console.log(data);
            logger.emit('INFO', data);
        }),
      );
    }
  }
  