/* eslint-disable dot-location */
/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';

import { ExtensionDefinition } from '@generated/extension-definition/extension-definition.model';

import { ControllerService } from 'modules/controller/controller.service';
import { ExtensionApi } from 'modules/utils';
import { ExtensionBody } from 'modules/utils/api.types';

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
  private readonly logger = new Logger(ExtensionDefinitionService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private httpService: HttpService,
    private controllerService: ControllerService,
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
        dockerImageTag: extensionDefinitionUpdateBody.dockerImageTag,
        dockerRepository: extensionDefinitionUpdateBody.dockerRepository,
        icon: extensionDefinitionUpdateBody.icon,
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
    const { extensionDefinition, extensionRouter } =
      await this.preflightForSpecAndCheck(
        extensionDefinitionRequestIdBody.extensionDefinitionId,
        extensionDefinitionRequestIdBody.workspaceId,
      );

    return await this.getExtensionSpec(
      extensionDefinition,
      extensionRouter?.endpoint,
    );
  }

  // Check if the credentails are valid for the extension
  async checkIfCredentialsValid(
    extensionDefinitionCheckBody: ExtensionDefinitionCheckBody,
  ): Promise<ExtensionDefinitionCheck> {
    const { extensionDefinition, extensionRouter } =
      await this.preflightForSpecAndCheck(
        extensionDefinitionCheckBody.extensionDefinitionId,
        extensionDefinitionCheckBody.workspaceId,
      );
    return await this.getExtensionCheck(
      extensionDefinition,
      extensionRouter?.endpoint,
      extensionDefinitionCheckBody.config,
    );
  }

  /**
   * Utilities
   */

  async preflightForSpecAndCheck(
    extensionDefinitionId: string,
    workspaceId: string,
  ) {
    const extensionDefinition = await this.getExtensionDefinitionWithId({
      extensionDefinitionId,
      workspaceId,
    });
    const extensionRouter = await this.prisma.extensionRouter.findUnique({
      where: {
        extensionDefinitionId,
      },
    });
    const workspace = await this.prisma.workspace.findUnique({
      where: {
        workspaceId,
      },
    });

    if (!extensionRouter) {
      /**
       * Deploy the extension wait for it and then hit the service
       */
      this.logger.log(
        `${extensionDefinition.name} not found and create an extension`,
      );
      const deploymentStatus =
        await this.controllerService.createExtensionDeploymentSync(
          false,
          extensionDefinition,
          workspace.slug,
        );

      if (!deploymentStatus) {
        throw new BadRequestException('Deployment failed');
      }
    }

    return { extensionDefinition, extensionRouter };
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
      endpoint:
        endpoint ??
        `http://${extensionDefinition.name
          .toLowerCase()
          .replace(/ /g, '-')}${this.configService.get(
          'EXTENSION_BASE_HOST',
        )}/graphql`,
    };

    this.logger.log(
      `Getting spec for this extension ${extensionDefinition.name} with endpoint as ${extensionBody.endpoint}`,
    );

    const specResponse = await extensionService.getSpec(extensionBody);
    return specResponse;
  }

  async getExtensionCheck(
    extensionDefinition: ExtensionDefinition | ExtensionDefinitionCreateBody,
    endpoint: string | undefined,
    config: JSON,
  ): Promise<ExtensionDefinitionCheck> {
    const extensionService = new ExtensionApi(
      this.httpService,
      this.configService,
    );

    this.logger.log(
      `Sending request to ${extensionDefinition.name} with endpoint: ${endpoint}`,
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const configForExtension = { ...config } as any;

    /**
     * Delete extensionAccountName as that is not a valid field for extension
     */
    delete configForExtension['extensionAccountName'];

    const extensionBody: ExtensionBody = {
      query: `query Check($config: CredentialsT0){check(config:$config){status}}`,
      endpoint:
        endpoint ??
        `http://${extensionDefinition.name
          .toLowerCase()
          .replace(/ /g, '-')}${this.configService.get(
          'EXTENSION_BASE_HOST',
        )}/graphql`,
      variables: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: configForExtension,
      },
    };

    this.logger.log(
      `Checking extension health for ${extensionDefinition.name} with endpoint as ${extensionBody.endpoint}`,
    );
    const checkResponse = await extensionService.check(extensionBody);
    return checkResponse;
  }
}
