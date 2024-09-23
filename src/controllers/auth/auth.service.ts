import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import jwt from 'jsonwebtoken';
import { DspHrApiService } from 'src/services/api/dsp.hr.api.service';
import _ from "lodash";


@Injectable()
export class AuthService {

  constructor(private readonly dsphrApiService: DspHrApiService){}

  async create(createAuthDto: CreateAuthDto) {
    // const user = _.first(
    //   (await this.dsphrApiService.searchEmployee(createAuthDto))?.body?.List ??
    //   [],
    // );

    const user = {
      "email_addr": "Tim@xd.com"
    };

    const data = {
      ...createAuthDto,
      enName: user?.email_addr.split('@')?.[0]?.replaceAll('_', ' ') ?? '',
    };

    // return data;

    const accessToken = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    return accessToken;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
