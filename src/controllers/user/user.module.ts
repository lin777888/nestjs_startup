import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BaseModule } from '../base/base.module';

@Module({
  imports:[BaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
