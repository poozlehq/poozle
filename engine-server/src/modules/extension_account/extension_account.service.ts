/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { ExtensionAccount } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { ExtensionDefinitionRequestIdBody } from 'modules/extension_definition/extension_definition.interface';
import { ExtensionDefinitionService } from 'modules/extension_definition/extension_definition.service';

import {
  ExtensionAccountCreateBody,
  ExtensionAccountGetRequestBody,
  ExtensionAccountRequestIdBody,
} from './extension_account.interface';

@Injectable()
export class ExtensionAccountService {
  constructor(
    private prisma: PrismaService,
    private extensionDefinitionService: ExtensionDefinitionService,
  ) {}

  async getAllExtensionAccountsInWorkspace(
    extensionAccountGetRequestBody: ExtensionAccountGetRequestBody,
  ): Promise<ExtensionAccount[]> {
    return this.prisma.extensionAccount.findMany({
      where: {
        workspaceId: extensionAccountGetRequestBody.workspaceId,
      },
    });
  }

  async getExtensionAccountWithId(
    extensionAccountRequestIdBody: ExtensionAccountRequestIdBody,
  ): Promise<ExtensionAccount> {
    return this.prisma.extensionAccount.findUnique({
      where: {
        extensionAccountId: extensionAccountRequestIdBody.extensionAccountId,
      },
    });
  }

  async createExtensionAccount(
    extensionAccountCreateBody: ExtensionAccountCreateBody,
  ): Promise<ExtensionAccount> {
    const extensionDefinition =
      await this.extensionDefinitionService.getExtensionDefinitionWithId({
        extensionDefinitionId: extensionAccountCreateBody.extensionDefinitionId,
      } as ExtensionDefinitionRequestIdBody);

    return this.prisma.extensionAccount.create({
      data: {
        ...extensionAccountCreateBody,
        name: extensionDefinition.name,
      },
    });
  }
}
