/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Workspace } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { ExtensionDefinition } from '@generated/extension-definition/extension-definition.model';

import { ControllerApi, ExtensionApi } from 'modules/utils';
import { ControllerBody, ExtensionBody } from 'modules/utils/api.types';

import {
  ExtensionDefinitionCreateBody,
  ExtensionDefinitionRequestIdBody,
  ExtensionDefinitionRequestWorkspaceIdBody,
  ExtensionDefinitionSpec,
} from './extension_definition.interface';

const controllerPath = 'extension';

@Injectable()
export class ExtensionDefinitionService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

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
    return this.prisma.extensionDefinition.create({
      data: {
        ...extensionDefinitionCreateBody,
      },
    });
  }

  async getSpecForExtensionDefinition(
    extensionDefinitionRequestIdBody: ExtensionDefinitionRequestIdBody,
  ): Promise<ExtensionDefinitionSpec> {
    const extensionDefinition = await this.getExtensionDefinitionWithId(
      extensionDefinitionRequestIdBody,
    );

    // Check if Extension router is there for this extension definition
    const extensionRouter = await this.prisma.extensionRouter.findUnique({
      where: {
        extensionDefinitionId:
          extensionDefinitionRequestIdBody.extensionDefinitionId,
      },
    });

    if (!extensionRouter) {
      /**
       * Deploy the extension wait for it and then hit the service
       */
      const deploymentStatus = await this.getExtensionDeploymentStatus(
        extensionDefinition,
        extensionDefinition.workspace,
      );

      if (!deploymentStatus) {
        throw new BadRequestException('Deployment failed');
      }
    }

    return await this.getExtensionSpec(
      extensionDefinition,
      extensionRouter.endpoint,
    );
  }

  async getExtensionSpec(
    extensionDefinition: ExtensionDefinition | ExtensionDefinitionCreateBody,
    endpoint: string | undefined,
  ): Promise<ExtensionDefinitionSpec> {
    const extensionService = new ExtensionApi(
      this.httpService,
      this.configService,
    );
    const extensionBody: ExtensionBody = {
      query: `{getSpec{spec}}`,
      endpoint: endpoint ?? extensionDefinition.name,
    };
    const specResponse = await extensionService.getSpec(extensionBody);
    return specResponse;
  }

  async getExtensionDeploymentStatus(
    extensionDefinition: ExtensionDefinition | ExtensionDefinitionCreateBody,
    workspace: Workspace,
  ): Promise<boolean> {
    /**
     * This will call controller asking to create the deployment and service
     * for the extension
     */
    const createExtensionBody: ControllerBody = {
      event: 'CREATE_WITHOUT_RESTART',
      slug: extensionDefinition.name,
      dockerImage: `${extensionDefinition.dockerRepository}:${extensionDefinition.dockerImageTag}`,
      workspaceSlug: workspace.slug,
    };

    const controllerService = new ControllerApi(
      this.httpService,
      this.configService,
    );
    await controllerService.post(createExtensionBody, controllerPath);

    /**
     * Now the deployment is done we need to wait for that status to be successful
     * After which we can query the service directly
     */
    const counter = 0;
    let deploymentStatus = false;

    /**
     * Try 5 times before we return false and throw some error
     * TODO (harshith): Change this to a better solution later
     */
    while (counter < 5 && !deploymentStatus) {
      const controllerBody: ControllerBody = {
        event: 'STATUS',
        slug: extensionDefinition.name,
      };

      const deploymentStatusResponse = await controllerService.post(
        controllerBody,
        controllerPath,
      );
      deploymentStatus = deploymentStatusResponse.status;

      /**
       * Sleep for 5 seconds if the deployment status is false
       */
      if (!deploymentStatus) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    return deploymentStatus;
  }
}
