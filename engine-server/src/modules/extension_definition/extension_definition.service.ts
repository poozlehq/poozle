/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { HttpService } from '@nestjs/axios'

import { ExtensionDefinition } from '@generated/extension-definition/extension-definition.model';

import {
  ExtensionDefinitionCreateBody,
  ExtensionDefinitionRequestIdBody,
  ExtensionDefinitionRequestWorkspaceIdBody,
} from './extension_definition.interface';

import { ControllerApi, ExtensionApi } from 'modules/utils'
import { ControllerBody, ExtensionBody, } from 'modules/utils/api.types';
import { Workspace } from '@prisma/client';

const controllerPath = 'extension'

@Injectable()
export class ExtensionDefinitionService {
  constructor(private prisma: PrismaService, private httpService: HttpService) { }

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
  ) : Promise<ExtensionDefinition> {
    const workspace = await this.prisma.workspace.findUnique({
      where: { workspaceId: extensionDefinitionCreateBody.workspaceId },
    });
    const controllerService = new ControllerApi(this.httpService)
    await this.getStatus(controllerService, extensionDefinitionCreateBody, workspace)

    return this.prisma.extensionDefinition.create({
      data: {
        ...extensionDefinitionCreateBody,
      },
    });
  }

  async getSpec(){
    const extensionService = new ExtensionApi(this.httpService)
    const extensionBody: ExtensionBody = { query: `{getSpec{spec}}` }
    const specResponse = await extensionService.getSpec(extensionBody)
    return specResponse.spec
  }


  async getStatus(controllerService: ControllerApi, extensionDefinition: ExtensionDefinitionCreateBody, workspace: Workspace) {
    const createExtensionBody: ControllerBody = {
      event: 'CREATE',
      slug: extensionDefinition.name,
      dockerImage: `${extensionDefinition.dockerRepository}:${extensionDefinition.dockerImageTag}`,
      workspaceSlug: workspace.slug
    }

    controllerService.post(createExtensionBody, controllerPath)

    let counter = 0
    let status = false
    while (counter < 5 && !status) {
      const controllerBody: ControllerBody = {
        event: 'STATUS',
        slug: extensionDefinition.name
      }

      const response = await controllerService.post(controllerBody, controllerPath)
      status = response.status
      if (!status) {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    return status
  }


}
