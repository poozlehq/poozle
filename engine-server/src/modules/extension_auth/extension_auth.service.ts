/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { ExtensionAuth } from '@generated/extension-auth/extension-auth.model';

import {
  ExtensionAuthCreateBody,
  ExtensionAuthRequestIdBody,
  ExtensionAuthRequestUpdateBody,
  ExtensionAuthRequestWorkspaceIdBody,
  ExtensionAuthRequestWorkspaceSlugBody,
} from './extension_auth.interface';

@Injectable()
export class ExtensionAuthService {
  constructor(private prisma: PrismaService) {}

  async getExtensionAuthsForWorkspace(
    extensionAuthRequestWorkspaceIdBody: ExtensionAuthRequestWorkspaceIdBody,
  ): Promise<ExtensionAuth[]> {
    return await this.prisma.extensionAuth.findMany({
      where: {
        workspaceId: extensionAuthRequestWorkspaceIdBody.workspaceId,
      },
    });
  }

  async getExtensionAuth(
    extensionAuthRequestIdBody: ExtensionAuthRequestIdBody,
  ): Promise<ExtensionAuth> {
    return await this.prisma.extensionAuth.findUnique({
      where: {
        extensionAuthId: extensionAuthRequestIdBody.extensionAuthId,
      },
      include: {
        extensionDefinition: true,
      },
    });
  }

  async getExtensionAuthsForWorkspaceSlug(
    extensionAuthRequestWorkspaceSlugBody: ExtensionAuthRequestWorkspaceSlugBody,
  ): Promise<ExtensionAuth[]> {
    const workspace = await this.prisma.workspace.findUnique({
      where: {
        slug: extensionAuthRequestWorkspaceSlugBody.slug,
      },
    });

    return await this.prisma.extensionAuth.findMany({
      where: {
        workspaceId: workspace.workspaceId,
      },
      include: {
        extensionDefinition: true,
      },
    });
  }

  async createExtensionAuth(extensionAuthCreate: ExtensionAuthCreateBody) {
    return await this.prisma.extensionAuth.create({
      data: {
        extensionDefinitionId: extensionAuthCreate.extensionDefinitionId,
        clientId: extensionAuthCreate.clientId,
        clientSecret: extensionAuthCreate.clientSecret,
        scopes: extensionAuthCreate.scopes,
        extensionAuthName: extensionAuthCreate.extensionAuthName,
        workspaceId: extensionAuthCreate.workspaceId,
      },
    });
  }

  async updateExtensionAuth(
    extensionAuthRequestUpdateBody: ExtensionAuthRequestUpdateBody,
  ) {
    return await this.prisma.extensionAuth.update({
      where: {
        extensionAuthId: extensionAuthRequestUpdateBody.extensionAuthId,
      },
      data: {
        clientId: extensionAuthRequestUpdateBody.clientId,
        clientSecret: extensionAuthRequestUpdateBody.clientSecret,
        scopes: extensionAuthRequestUpdateBody.scopes,
        extensionAuthName: extensionAuthRequestUpdateBody.extensionAuthName,
      },
    });
  }
}
