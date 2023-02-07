/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import {
  ExtensionDefinition,
  ExtensionType,
  ReleaseStage,
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import {
  ExtensionDefinitionCreateBody,
  ExtensionDefinitionRequestIdBody,
} from './extension_definition.interface';

@Injectable()
export class ExtensionDefinitionService {
  constructor(private prisma: PrismaService) {}

  async getAllExtensionDefinitions(): Promise<ExtensionDefinition[]> {
    return this.prisma.extensionDefinition.findMany();
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
        releaseStage: ReleaseStage.CUSTOM,
        extensionType: ExtensionType.GRAPHQL,
      },
    });
  }
}
