/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

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
    return this.prisma.user.create({
      data: {
        ...userData,
        userId,
      },
    });
  }
}
