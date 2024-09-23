import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './controllers/post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './controllers/user/user.module';
import { AuthModule } from './controllers/auth/auth.module';
import { BaseModule } from './controllers/base/base.module';

@Module({
  imports: [PostModule, PrismaModule, UserModule, AuthModule, BaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
