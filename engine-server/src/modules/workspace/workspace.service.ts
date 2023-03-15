/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable, Logger } from '@nestjs/common';
import { Workspace } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { User } from '@generated/user/user.model';

import { ControllerService } from 'modules/controller/controller.service';
import { HiveService } from 'modules/hive/hive.service';

import {
  WorkspaceCreateBody,
  WorkspaceRequestIdBody,
  WorkspaceUpdateBody,
} from './workspace.interface';

@Injectable()
export class WorkspaceService {
  private readonly logger = new Logger(WorkspaceService.name);

  constructor(
    private prisma: PrismaService,
    private hiveService: HiveService,
    private controllerService: ControllerService,
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

    this.logger.log(`Creating gateway for this workspace ${workspace.slug}`);
    await this.controllerService.createGatewayDeployment(workspace);

    this.logger.log(`Gateway created for this workspace ${workspace.slug}`);
    /**
     * Create Hive organisation and project for this user and workspace
     * TODO (harshith): Change this later remove hive org and project dependency
     */
    this.logger.log(
      `Creating Hive organisation for this workspace ${workspace.slug}`,
    );
    const accessToken = await this.hiveService.login();
    await this.hiveService.createOrganisation(user.userId, accessToken);
    await this.hiveService.createProject(
      createWorkspaceBody.slug,
      user.userId,
      accessToken,
    );
    const hiveToken = await this.hiveService.createAccessToken(
      createWorkspaceBody.slug,
      user.userId,
      accessToken,
    );
    await this.prisma.gateway.create({
      data: {
        hiveToken,
        workspaceId: workspace.workspaceId,
      },
    });
    /**
     * Replace the above
     */
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

  async updateWorkspace(updateWorkspaceBody: WorkspaceUpdateBody) {
    return await this.prisma.workspace.update({
      data: {
        initialSetupComplete: updateWorkspaceBody.initialSetupComplete,
      },
      where: {
        workspaceId: updateWorkspaceBody.workspaceId,
      },
    });
  }

  async deleteWorkspace(workspaceRequestIdBody: WorkspaceRequestIdBody) {
    const workspace = await this.prisma.workspace.update({
      where: { workspaceId: workspaceRequestIdBody.workspaceId },
      data: { deleted: new Date() },
    });

    this.logger.log(`Deleting gateway for this workspace ${workspace.slug}`)
    await this.controllerService.deleteGatewayDeployment(workspace);
  }
}
