/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { ExtensionRouter } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import {
  ExtensionRouterCreateBody,
  ExtensionRouterRequestIdBody,
} from './extension_router.interface';

@Injectable()
export class ExtensionRouterService {
  constructor(private prisma: PrismaService) {}

  async getExtensionRouterWithId(
    extensionRouterRequestIdBody: ExtensionRouterRequestIdBody,
  ): Promise<ExtensionRouter> {
    return this.prisma.extensionRouter.findUnique({
      where: {
        extensionRouterId: extensionRouterRequestIdBody.extensionRouterId,
      },
    });
  }

  async createExtensionRouter(
    extensionRouterCreateBody: ExtensionRouterCreateBody,
  ): Promise<ExtensionRouter> {
    return this.prisma.extensionRouter.create({
      data: {
        extensionDefinitionId: extensionRouterCreateBody.extensionDefinitionId,
        endpoint: extensionRouterCreateBody.endpoint,
      },
    });
  }
}
