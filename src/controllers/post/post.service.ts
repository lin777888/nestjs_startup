import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReorderPostDto } from './dto/reorder-post.dto';
import _ from 'lodash';

@Injectable()
export class PostService {

  constructor(private prismaService: PrismaService){}

  create(createPostDto: CreatePostDto) {
    return this.prismaService.post.create(
      {
        data: createPostDto
      }
    )
  }

  async findAll() {
    const list = await this.prismaService.post.findMany(
      {
        orderBy: {order: 'asc'}
      }
    );

    return list;
  }

  async findOne(id: number) {

    const post = await this.prismaService.post.findUnique({
      where: { id }
    })

    if (!post){
      throw new HttpException(
        `Post id: ${id} Not Found, Please Contant Developers`,
        404
      )
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.prismaService.post.findUnique({
      where: {id}
    });

    if (!post){
      throw new HttpException(
        `Post id: ${id} Not Found, Please Contant Developers`,
        404
      )
    }

    return this.prismaService.post.update(
      {
        where: {id},
        data: updatePostDto
      }
    )
  }

  remove(id: number) {
    return this.prismaService.post.delete(
      {
        where: {id}
      }
    )
  }

  async reorder(reorderPostDto: ReorderPostDto){
    const posts = await this.prismaService.post.findMany();

    const [sourcePost] = posts.splice(reorderPostDto.sourceIndex, 1);
    posts.splice(reorderPostDto.targetIndex, 0, sourcePost);

    const updatePromises = _.map(posts, (post, index) => {
      return this.prismaService.post.update({
        where: {id: post.id},
        data: { order: index + 1}
      })
    })
    
    return await Promise.all(updatePromises);
  }
}
