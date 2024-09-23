import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DspHrApiService } from 'src/services/api/dsp.hr.api.service';
import { BaseModule } from '../base/base.module';

@Module({
  imports: [BaseModule],
  controllers: [AuthController],
  providers: [AuthService, DspHrApiService],
})
export class AuthModule {}
