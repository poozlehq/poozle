/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { ExtensionDefinition, ReleaseStage } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

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
      },
    });
  }
}
