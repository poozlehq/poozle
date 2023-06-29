/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CheckResponse, Config } from '@poozle/engine-edk';
import { IntegrationType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import {
  checkIntegrationCredentials,
  runProxyIntegrationCommand,
} from 'shared/integration_run_utils';

import { IntegrationDefinitionService } from 'modules/integration_definition /integration_definition.service';

import {
  IntegrationAccountRequestBody,
  IntegrationAccountRequestBodyWithIntegrationType,
  IntegrationAccountRequestIdBody,
  ProxyBody,
  UpdateIntegrationAccountBody,
} from './integration_account.interface';

@Injectable()
export class IntegrationAccountService {
  constructor(
    private prismaService: PrismaService,
    private integrationDefinitionService: IntegrationDefinitionService,
  ) {}

  async checkForIntegrationCredentails(
    integrationDefinitionId: string,
    config: Config,
    authType: string,
    workspaceId: string,
  ): CheckResponse {
    const integrationDefinition =
      await this.integrationDefinitionService.getIntegrationDefinitionWithId(
        {
          integrationDefinitionId,
        },
        workspaceId,
      );

    return await checkIntegrationCredentials(
      integrationDefinition.sourceUrl,
      config,
      authType,
    );
  }

  async createIntegrationAccount(
    integrationDefinitionId: string,
    config: Config,
    integrationAccountName: string,
    authType: string,
    workspaceId: string,
  ) {
    const { status } = await this.checkForIntegrationCredentails(
      integrationDefinitionId,
      config,
      authType,
      workspaceId,
    );

    if (status) {
      return await this.prismaService.integrationAccount.create({
        data: {
          integrationAccountName,
          integrationDefinitionId,
          workspaceId,
          integrationConfiguration: config,
          authType,
        },
      });
    }

    throw new BadRequestException('Not a valid credentials');
  }

  async getIntegrationAccountWithId(
    integrationAccountRequestIdBody: IntegrationAccountRequestIdBody,
  ) {
    return await this.prismaService.integrationAccount.findUnique({
      where: {
        integrationAccountId:
          integrationAccountRequestIdBody.integrationAccountId,
      },
      include: {
        integrationDefinition: true,
      },
    });
  }

  async getIntegrationAccount(
    integrationAccountRequestBody: IntegrationAccountRequestBody,
  ) {
    const integrationAccounts =
      await this.prismaService.integrationAccount.findMany({
        where: {
          workspaceId: integrationAccountRequestBody.workspaceId,
          integrationAccountName:
            integrationAccountRequestBody.integrationAccountName,
        },
        include: {
          integrationDefinition: true,
        },
      });

    if (integrationAccounts.length === 0) {
      return new NotFoundException('No integration found');
    }

    return integrationAccounts[0];
  }

  async getIntegrationAccountWithIntegrationType(
    integrationAccountRequestBody: IntegrationAccountRequestBodyWithIntegrationType,
  ) {
    const integrationAccounts =
      await this.prismaService.integrationAccount.findMany({
        where: {
          workspaceId: integrationAccountRequestBody.workspaceId,
          integrationAccountName:
            integrationAccountRequestBody.integrationAccountName,
          integrationDefinition: {
            integrationType: integrationAccountRequestBody.integrationType,
          },
        },
        include: {
          integrationDefinition: true,
        },
      });

    if (integrationAccounts.length === 0) {
      throw new NotFoundException('No integration found');
    }

    return integrationAccounts[0];
  }

  async getIntegrationAccountsForCategory(category: IntegrationType) {
    return await this.prismaService.integrationAccount.findMany({
      where: {
        integrationDefinition: {
          integrationType: category,
        },
      },
      include: {
        integrationDefinition: true,
      },
    });
  }

  async getIntegrationAccountsForWorkspace(workspaceId: string) {
    return await this.prismaService.integrationAccount.findMany({
      where: {
        workspace: {
          workspaceId,
        },
      },
      include: {
        integrationDefinition: true,
      },
    });
  }

  async updateIntegrationAccount(
    integrationAccountId: string,
    updateIntegrationAccountBody: UpdateIntegrationAccountBody,
  ) {
    return await this.prismaService.integrationAccount.update({
      data: updateIntegrationAccountBody,
      where: {
        integrationAccountId,
      },
    });
  }

  async checkForIntegrationAccountName(
    workspaceId: string,
    integrationAccountName: string,
  ): Promise<boolean> {
    const accounts = await this.prismaService.integrationAccount.findMany({
      where: {
        workspaceId,
        integrationAccountName,
      },
    });

    if (accounts.length === 0) {
      return true;
    }

    return false;
  }

  async runProxyCommand(integrationAccountId: string, body: ProxyBody) {
    const integrationAccount =
      await this.prismaService.integrationAccount.findUnique({
        where: {
          integrationAccountId,
        },
        include: {
          integrationDefinition: true,
        },
      });

    return await runProxyIntegrationCommand(
      integrationAccount.integrationDefinition.sourceUrl,
      body.path,
      body.method,
      integrationAccount.integrationConfiguration as Config,
      integrationAccount.authType,
      {
        requestBody: body.postBody,
      },
    );
  }
}
