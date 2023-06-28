/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
} from 'unique-names-generator';

import { CreateUserInput, UpdateUserInput } from './user.interface';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(
    userId: string,
    newUserData: UpdateUserInput,
  ): Promise<User> {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        userId,
      },
    });
  }

  async getUser(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        Workspace: true,
      },
    });
  }

  async createUser(userId: string, userData: CreateUserInput): Promise<User> {
    const randomName: string = uniqueNamesGenerator({
      dictionaries: [adjectives, colors],
      separator: '-',
    }); // big_red

    return this.prisma.user.create({
      data: {
        ...userData,
        userId,
        Workspace: {
          create: {
            slug: randomName,
          },
        },
      },
      include: {
        Workspace: true,
      },
    });
  }
}
