/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { ExtensionAuth } from '@generated/extension-auth/extension-auth.model';

import {
  ExtensionAuthCreateBody,
  ExtensionAuthRequestUpdateBody,
  ExtensionAuthRequestWorkspaceIdBody,
  WebhookAuthUrlBody
} from './webhook.interface';

@Injectable()
export class WebhookService {
  constructor(private prisma: PrismaService) {}

  async getAuthWebhookUrl(
    extensionDetails: WebhookAuthUrlBody
  ): Promise<any>{
    console.log(extensionDetails)
    const workspace = this.prisma.workspace.findUnique({
      where:{
        workspaceId: extensionDetails.workspaceId
      }
    })

    const extensionAuth = this.prisma.extensionAuth.findMany({
      where:{
        extensionDefinitionId: extensionDetails.extensionDefinitionId
      }
    })

    return undefined
  }

  async getExtensionAuthForWorkspace(
    extensionAuthRequestWorkspaceIdBody: ExtensionAuthRequestWorkspaceIdBody,
  ): Promise<ExtensionAuth[]> {
    return await this.prisma.extensionAuth.findMany({
      where: {
        workspaceId: extensionAuthRequestWorkspaceIdBody.workspaceId,
      },
    });
  }

  async createExtensionAuth(extensionAuthCreate: ExtensionAuthCreateBody) {
    return await this.prisma.extensionAuth.create({
      data: {
        extensionDefinitionId: extensionAuthCreate.extensionDefinitionId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        credential: extensionAuthCreate.credential as any,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        credential: extensionAuthRequestUpdateBody.credential as any,
      },
    });
  }
}
