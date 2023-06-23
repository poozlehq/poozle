/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CheckResponse, Config } from '@poozle/engine-edk';
import { IntegrationType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { checkIntegrationCredentials } from 'shared/integration_run_utils';

import { IntegrationDefinitionService } from 'modules/integration_definition /integration_definition.service';

import { IntegrationAccountRequestBody } from './integration_account.interface';

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
  ): CheckResponse {
    const integrationDefinition =
      await this.integrationDefinitionService.getIntegrationDefinitionWithId({
        integrationDefinitionId,
      });

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
}
