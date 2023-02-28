/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { Workspace } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { HttpService } from '@nestjs/axios'

import { User } from '@generated/user/user.model';

import {
  WorkspaceCreateBody,
  WorkspaceRequestIdBody,
} from './workspace.interface';
import { ControllerApi } from 'modules/utils'
import { ControllerBody } from 'modules/utils/api.types';


const controllerPath = 'workspace'

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService, private httpService: HttpService) { }

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

    const controllerBody: ControllerBody = {
      event: 'CREATE',
      slug: workspace.slug
    }

    const controllerService = new ControllerApi(this.httpService)
    controllerService.post(controllerBody, controllerPath)

    return workspace
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
      data: { deleted: new Date() }
    })

    const controllerBody: ControllerBody = {
      event: 'DELETE',
      slug: workspace.slug
    }
    const controllerService = new ControllerApi(this.httpService)
    controllerService.post(controllerBody, controllerPath)

    return workspace
  }
}
