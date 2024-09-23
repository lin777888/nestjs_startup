import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import _ from 'lodash';
import { createUnzip } from 'zlib';
import { UserPayload } from 'src/auth/user-payload.interface';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService){}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create(
      {
        data: createUserDto
      }
    )
  }

  async findAll(user: UserPayload) {
    return this.prismaService.user.findMany({
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
      where: {
        id: user.id,
      },
    });
  }

  async findOne(id: number) {

    const user = await this.prismaService.user.findUnique({
      where: { id }
    })

    if (!user){
      throw new HttpException(
        `User id: ${id} Not Found, Please Contant Developers`,
        404
      )
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {id}
    });

    if (!user){
      throw new HttpException(
        `User id: ${id} Not Found, Please Contant Developers`,
        404
      )
    }

    return this.prismaService.user.update(
      {
        where: {id},
        data: updateUserDto
      }
    )
  }

  remove(id: number) {
    return this.prismaService.user.delete(
      {
        where: {id}
      }
    )
  }
}
