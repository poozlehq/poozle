/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { ExtensionDefinition } from '@generated/extension-definition/extension-definition.model';

import {
  ExtensionDefinitionCreateBody,
  ExtensionDefinitionRequestIdBody,
  ExtensionDefinitionRequestWorkspaceIdBody,
} from './extension_definition.interface';

@Injectable()
export class ExtensionDefinitionService {
  constructor(private prisma: PrismaService) {}

  async getAllExtensionDefinitions(): Promise<ExtensionDefinition[]> {
    return this.prisma.extensionDefinition.findMany({
      where: {
        workspaceId: null,
      },
    });
  }

  async getExtensionDefinitionsForWorkspace(
    extensionDefinitionRequestWorkspaceIdBody: ExtensionDefinitionRequestWorkspaceIdBody,
  ): Promise<ExtensionDefinition[]> {
    return this.prisma.extensionDefinition.findMany({
      where: {
        workspaceId: extensionDefinitionRequestWorkspaceIdBody.workspaceId,
      },
    });
  }

  async getExtensionDefinitionWithId(
    extensionDefinitionRequestIdBody: ExtensionDefinitionRequestIdBody,
  ): Promise<ExtensionDefinition> {
    return this.prisma.extensionDefinition.findUnique({
      where: {
        extensionDefinitionId:
          extensionDefinitionRequestIdBody.extensionDefinitionId,
      },
    });
  }

  async createExtensionDefinition(
    extensionDefinitionCreateBody: ExtensionDefinitionCreateBody,
  ): Promise<ExtensionDefinition> {
    return this.prisma.extensionDefinition.create({
      data: {
        ...extensionDefinitionCreateBody,
      },
    });
  }
}
