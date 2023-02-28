/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Workspace } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { User } from '@generated/user/user.model';

import { ControllerApi } from 'modules/utils';
import { ControllerBody } from 'modules/utils/api.types';

import {
  WorkspaceCreateBody,
  WorkspaceRequestIdBody,
} from './workspace.interface';

const controllerPath = 'workspace';

@Injectable()
export class WorkspaceService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,

    private httpService: HttpService,
  ) {}

  async createWorkspace(
    createWorkspaceBody: WorkspaceCreateBody,
    user: User,
  ): Promise<Workspace> {
    const workspace = await this.prisma.workspace.create({
      data: {
        ...createWorkspaceBody,
        userId: user.userId,
      },
    });
    /**
     * Send event to controller to create the workspace deployment and service
     */
    const controllerBody: ControllerBody = {
      event: 'CREATE',
      slug: workspace.slug,
    };
    const controllerService = new ControllerApi(
      this.httpService,
      this.configService,
    );

    await controllerService.post(controllerBody, controllerPath);
    return workspace;
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

  async deleteWorkspace(workspaceRequestIdBody: WorkspaceRequestIdBody) {
    const workspace = await this.prisma.workspace.update({
      where: { workspaceId: workspaceRequestIdBody.workspaceId },
      data: { deleted: new Date() },
    });

    /**
     * Send event to controller to delete the workspace deployment and service
     */
    const controllerBody: ControllerBody = {
      event: 'DELETE',
      slug: workspace.slug,
    };
    const controllerService = new ControllerApi(
      this.httpService,
      this.configService,
    );

    await controllerService.post(controllerBody, controllerPath);
    return workspace;
  }
}
