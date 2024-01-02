/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { User, Workspace } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
} from 'unique-names-generator';

import { IntegrationDefinitionService } from 'modules/integration_definition/integration_definition.service';

import { CreateUserInput, UpdateUserInput } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private integrationDefinitionService: IntegrationDefinitionService,
  ) {}

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

  async createUser(
    userId: string,
    userData: CreateUserInput,
    workspaceSlug?: string,
  ): Promise<User & { workspace: Workspace }> {
    if (!workspaceSlug) {
      workspaceSlug = uniqueNamesGenerator({
        dictionaries: [adjectives, colors],
        separator: '-',
      }); // big_red
    }

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        userId,
        Workspace: {
          create: {
            workspaceId: workspaceSlug,
            slug: workspaceSlug,
          },
        },
      },
      include: {
        Workspace: true,
      },
    });

    const workspace = user.Workspace[0];
    await this.integrationDefinitionService.updateIntegrationDefinitions(
      workspace.workspaceId,
    );
    
    return {
      ...user,
      workspace,
    };
  }
}
