/* eslint-disable dot-location */
/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';

import { ExtensionDefinition } from '@generated/extension-definition/extension-definition.model';

import {
  ExtensionDefinitionCheck,
  ExtensionDefinitionCheckBody,
  ExtensionDefinitionCreateBody,
  ExtensionDefinitionRequestIdBody,
  ExtensionDefinitionRequestWorkspaceIdBody,
  ExtensionDefinitionSpec,
  ExtensionDefinitionUpdateBody,
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
        OR: [
          {
            workspaceId: extensionDefinitionRequestWorkspaceIdBody.workspaceId,
          },
          {
            workspaceId: null,
          },
        ],
      },
    });
  }

  // TODO (harshith): Check for workspace here as to avoid security concerns
  async getExtensionDefinitionWithId(
    extensionDefinitionRequestIdBody: ExtensionDefinitionRequestIdBody,
  ): Promise<ExtensionDefinition> {
    return this.prisma.extensionDefinition.findUnique({
      where: {
        extensionDefinitionId:
          extensionDefinitionRequestIdBody.extensionDefinitionId,
      },
      include: {
        workspace: true,
      },
    });
  }

  async createExtensionDefinition(
    extensionDefinitionCreateBody: ExtensionDefinitionCreateBody,
  ): Promise<ExtensionDefinition> {
    return await this.prisma.extensionDefinition.create({
      data: {
        ...extensionDefinitionCreateBody,
      },
    });
  }

  async updateExtensionDefinition(
    extensionDefinitionUpdateBody: ExtensionDefinitionUpdateBody,
  ): Promise<ExtensionDefinition> {
    return await this.prisma.extensionDefinition.update({
      data: {
        icon: extensionDefinitionUpdateBody.icon,
        spec: extensionDefinitionUpdateBody.spec,
        version: extensionDefinitionUpdateBody.version,
        name: extensionDefinitionUpdateBody.name,
        extensionType: extensionDefinitionUpdateBody.extensionType,
        releaseStage: extensionDefinitionUpdateBody.releaseStage,
      },
      where: {
        extensionDefinitionId:
          extensionDefinitionUpdateBody.extensionDefinitionId,
      },
    });
  }

  async getSpecForExtensionDefinition(
    extensionDefinitionRequestIdBody: ExtensionDefinitionRequestIdBody,
  ): Promise<ExtensionDefinitionSpec> {
    const extensionDefinition = await this.getExtensionDefinitionWithId(
      extensionDefinitionRequestIdBody,
    );

    if (!extensionDefinition) {
      throw new NotFoundException('Extension Definition not found');
    }
    const specLink = extensionDefinition.spec;

    const spec = await axios.get(specLink);

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spec: spec.data as any,
    };
  }

  // Check if the credentails are valid for the extension
  async checkIfCredentialsValid(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _extensionDefinitionCheckBody: ExtensionDefinitionCheckBody,
  ): Promise<ExtensionDefinitionCheck> {
    return {
      status: true,
      error: '',
    };
  }
}
