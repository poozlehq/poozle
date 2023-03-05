/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { ExtensionRouter } from '@generated/extension-router/extension-router.model';

import {
  ExtensionRouterRequestIdBody,
  ExtensionRouterRequestUpdateBody,
  ExtensionRouterRequestWorkspaceIdBody,
} from './extension_router.interface';

@Injectable()
export class ExtensionRouterService {
  constructor(private prisma: PrismaService) {}

  async getExtensionRouterForWorkspace(
    extensionRouterRequestWorkspaceIdBody: ExtensionRouterRequestWorkspaceIdBody,
  ): Promise<ExtensionRouter[]> {
    return await this.prisma.extensionRouter.findMany({
      where: {
        workspaceId: extensionRouterRequestWorkspaceIdBody.workspaceId,
      },
    });
  }

  // TODO (harshith): Check for router here as to avoid security concerns
  async getExtensionRouterWithId(
    extensionRouterRequestIdBody: ExtensionRouterRequestIdBody,
  ): Promise<ExtensionRouter> {
    return await this.prisma.extensionRouter.findUnique({
      where: {
        extensionRouterId: extensionRouterRequestIdBody.extensionRouterId,
      },
      include: {
        workspace: true,
      },
    });
  }

  async updateExtensionRouter(
    extensionRouterRequestUpdateBody: ExtensionRouterRequestUpdateBody,
  ) {
    return await this.prisma.extensionRouter.update({
      where: {
        extensionRouterId: extensionRouterRequestUpdateBody.extensionRouterId,
      },
      data: {
        endpoint: extensionRouterRequestUpdateBody.endpoint,
      },
    });
  }
}
