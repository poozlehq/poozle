/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { Prisma, Workspace } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import {
  WorkspaceRequestIdBody,
  WorkspaceRequestSlugBody,
} from './workspace.interface';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async createWorkspace(data: Prisma.WorkspaceCreateInput): Promise<Workspace> {
    return this.prisma.workspace.create({
      data,
    });
  }

  async getAllWorkspaces(): Promise<Workspace[]> {
    return this.prisma.workspace.findMany();
  }

  async getWorkspaceWithId(workspaceRequestIdBody: WorkspaceRequestIdBody) {
    return this.prisma.workspace.findUnique({
      where: { workspaceId: workspaceRequestIdBody.workspaceId },
    });
  }

  async getWorkspaceWithSlug(
    workspaceRequestSlugBody: WorkspaceRequestSlugBody,
  ) {
    return this.prisma.workspace.findUnique({
      where: { slug: workspaceRequestSlugBody.slug },
    });
  }
}
