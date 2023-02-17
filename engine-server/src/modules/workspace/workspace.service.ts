/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { Workspace } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { User } from '@generated/user/user.model';

import {
  WorkspaceCreateBody,
  WorkspaceRequestIdBody,
} from './workspace.interface';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async createWorkspace(
    createWorkspaceBody: WorkspaceCreateBody,
    user: User,
  ): Promise<Workspace> {
    return this.prisma.workspace.create({
      data: {
        ...createWorkspaceBody,
        userId: user.userId,
      },
    });
  }

  async getAllWorkspaces(user: User): Promise<Workspace[]> {
    return this.prisma.workspace.findMany({
      where: {
        userId: user.userId,
      },
    });
  }

  async getWorkspaceWithId(workspaceRequestIdBody: WorkspaceRequestIdBody) {
    return this.prisma.workspace.findUnique({
      where: { workspaceId: workspaceRequestIdBody.workspaceId },
    });
  }
}
