/* eslint-disable dot-location */
/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'nestjs-prisma';

import { ExtensionAccount } from '@generated/extension-account/extension-account.model';

import { ControllerService } from 'modules/controller/controller.service';
import { ExtensionDefinitionRequestIdBody } from 'modules/extension_definition/extension_definition.interface';
import { ExtensionDefinitionService } from 'modules/extension_definition/extension_definition.service';

import {
  ExtensionAccountByEDGetRequestBody,
  ExtensionAccountCreateBody,
  ExtensionAccountGetRequestBody,
  ExtensionAccountRequestIdBody,
} from './extension_account.interface';

@Injectable()
export class ExtensionAccountService {
  private readonly logger = new Logger(ExtensionAccountService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private extensionDefinitionService: ExtensionDefinitionService,
    private controllerService: ControllerService,
  ) {}

  async getAllExtensionAccountsInWorkspace(
    extensionAccountGetRequestBody: ExtensionAccountGetRequestBody,
  ): Promise<ExtensionAccount[]> {
    return this.prisma.extensionAccount.findMany({
      where: {
        workspaceId: extensionAccountGetRequestBody.workspaceId,
      },
      include: {
        extensionDefinition: true,
      },
    });
  }

  async getAllExtensionAccountsForExtensionDefinition(
    extensionAccountByEDGetRequestBody: ExtensionAccountByEDGetRequestBody,
  ): Promise<ExtensionAccount[]> {
    return this.prisma.extensionAccount.findMany({
      where: {
        workspaceId: extensionAccountByEDGetRequestBody.workspaceId,
        extensionDefinitionId:
          extensionAccountByEDGetRequestBody.extensionDefinitionId,
      },
      include: {
        extensionDefinition: true,
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
    try {
      const extensionDefinition =
        await this.extensionDefinitionService.getExtensionDefinitionWithId({
          extensionDefinitionId:
            extensionAccountCreateBody.extensionDefinitionId,
        } as ExtensionDefinitionRequestIdBody);

      const extensionAccount = await this.prisma.extensionAccount.create({
        data: {
          name: extensionDefinition.name,
          workspaceId: extensionAccountCreateBody.workspaceId,
          extensionAccountName: extensionAccountCreateBody.extensionAccountName,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          extensionConfiguration:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            extensionAccountCreateBody.extensionConfiguration as any,
          extensionDefinitionId:
            extensionAccountCreateBody.extensionDefinitionId,
        },
        include: {
          workspace: true,
        },
      });

      /**
       * When Extension router is not created
       * TODO (harshith) move to extension_router controller
       */
      const extensionRouter = await this.prisma.extensionRouter.findMany({
        where: {
          extensionDefinitionId: extensionAccount.extensionDefinitionId,
        },
      });

      if (extensionRouter.length === 0) {
        /**
         * Create extension router for the extension
         */

        const EXTENSION_BASE_HOST = this.configService.get(
          'EXTENSION_BASE_HOST',
        );

        await this.prisma.extensionRouter.create({
          data: {
            endpoint: `http://${extensionDefinition.name
              .toLowerCase()
              .replace(/ /g, '_')}${EXTENSION_BASE_HOST}/graphql`,
            extensionDefinitionId: extensionAccount.extensionDefinitionId,
            workspaceId: extensionAccount.workspaceId,
          },
        });
      }

      /**
       * Create extension deployment
       */
      await this.controllerService.createExtensionDeployment(
        true,
        extensionDefinition,
        extensionAccount.workspace.slug,
      );

      return extensionAccount;
    } catch (e) {
      console.log(e);
      throw new GraphQLError(e.message);
    }
  }

  /**
   * Create all the deployments and services when the server starts up
   */
  async initServer() {
    this.logger.log('Starting server');
    const extensionAccounts = await this.prisma.extensionAccount.findMany({
      distinct: ['extensionDefinitionId', 'workspaceId'],
      include: {
        workspace: true,
      },
    });

    const workspaces = extensionAccounts.map((account) => account.workspace);

    const extensionDefinitions = await Promise.all(
      extensionAccounts.map(
        async (account) =>
          await this.extensionDefinitionService.getExtensionDefinitionWithId({
            extensionDefinitionId: account.extensionDefinitionId,
            workspaceId: account.workspaceId,
          }),
      ),
    );

    /** Create extension deployments */
    await Promise.all(
      extensionDefinitions.map(async (extensionDefinition) => {
        this.logger.log(
          `Creating deployment for extension ${extensionDefinition.name}:${extensionDefinition.extensionDefinitionId}`,
        );
        try {
          await this.controllerService.createExtensionDeploymentSync(
            false,
            extensionDefinition,
            '',
          );
        } catch (e) {
          this.logger.error(
            `Creating failed for extension: ${extensionDefinition.extensionDefinitionId} with ${e}`,
          );
        }
      }),
    );

    /** Create gateway deployments */
    await Promise.all(
      workspaces.map(async (workspace) => {
        this.logger.log(
          `Creating deployment for workspace ${workspace.slug}:${workspace.workspaceId}`,
        );
        try {
          await this.controllerService.createGatewayDeployment(workspace);
        } catch (e) {
          this.logger.error(
            `Creating failed for workspace: ${workspace.workspaceId} with ${e}`,
          );
        }
      }),
    );
  }
}
