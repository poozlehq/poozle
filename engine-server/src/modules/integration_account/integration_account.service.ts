/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CheckResponse, Config } from '@poozle/engine-idk';
import { IntegrationType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import {
  checkIntegrationCredentials,
  runProxyIntegrationCommand,
} from 'shared/integration_run_utils';

import { IntegrationDefinitionService } from 'modules/integration_definition/integration_definition.service';
import { SyncService } from 'modules/sync/sync.service';

import {
  CreateIntegrationAccountBody,
  IntegrationAccountRequestBody,
  IntegrationAccountRequestBodyWithIntegrationType,
  IntegrationAccountRequestIdBody,
  UpdateIntegrationAccountBody,
} from './integration_account.interface';

@Injectable()
export class IntegrationAccountService {
  constructor(
    private prismaService: PrismaService,
    private integrationDefinitionService: IntegrationDefinitionService,
    private syncService: SyncService,
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
    createIntegrationAccountBody: CreateIntegrationAccountBody,
  ) {
    const {
      integrationDefinitionId,
      config,
      integrationAccountName,
      authType,
      workspaceId,
      accountIdentifier,
      syncEnabled,
      syncPeriod,
    } = createIntegrationAccountBody;

    const { status } = await this.checkForIntegrationCredentails(
      integrationDefinitionId,
      config,
      authType,
      workspaceId,
    );

    if (syncEnabled) {
      const integrationDefinition =
        await this.integrationDefinitionService.getIntegrationDefinitionWithId(
          {
            integrationDefinitionId,
          },
          workspaceId,
        );

      if (integrationDefinition.integrationType !== IntegrationType.TICKETING) {
        throw new BadRequestException(
          'Sync currently is only supported to ticketing category',
        );
      }
    }

    if (status) {
      const integrationAccount =
        await this.prismaService.integrationAccount.create({
          data: {
            integrationAccountName,
            integrationDefinitionId,
            workspaceId,
            integrationConfiguration: config,
            authType,
            syncEnabled,
            syncPeriod,
            accountIdentifier,
          },
        });

      if (integrationAccount.syncEnabled) {
        await this.syncService.createScheduleIfNotExist(integrationAccount);
        await this.syncService.runInitialSync(integrationAccount);
      }

      return integrationAccount;
    }

    throw new BadRequestException('Not a valid credentials');
  }

  async createIntegrationAccountWithLink(
    integrationDefinitionId: string,
    config: Config,
    integrationAccountName: string,
    authType: string,
    workspaceId: string,
    linkId: string,
    accountIdentifier?: string,
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
          linkId,
          accountIdentifier,
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

  async deleteIntegrationAccount(
    integrationAccountRequestIdBody: IntegrationAccountRequestIdBody,
  ) {
    const integrationAccount = await this.getIntegrationAccountWithId(
      integrationAccountRequestIdBody,
    );

    const status = await this.syncService.deleteSyncSchedule(
      integrationAccount,
    );

    if (!status) {
      throw new BadRequestException('Deleting scheduling failed');
    }

    return await this.prismaService.integrationAccount.delete({
      where: {
        integrationAccountId:
          integrationAccountRequestIdBody.integrationAccountId,
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
          integrationAccountId:
            integrationAccountRequestBody.integrationAccountId,
        },
        orderBy: [
          {
            updatedAt: 'asc',
          },
        ],
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
          integrationAccountId:
            integrationAccountRequestBody.integrationAccountId,
          integrationDefinition: {
            integrationType: integrationAccountRequestBody.integrationType,
          },
        },
        orderBy: [
          {
            updatedAt: 'asc',
          },
        ],
        include: {
          integrationDefinition: true,
          workspace: true,
        },
      });

    if (integrationAccounts.length === 0) {
      throw new NotFoundException('No integration found');
    }

    return {
      ...integrationAccounts[0],
      workspaceName: integrationAccounts[0].workspace.slug.replace(/-/g, ''),
    };
  }

  async getIntegrationAccountsForCategory(category: IntegrationType) {
    return await this.prismaService.integrationAccount.findMany({
      where: {
        integrationDefinition: {
          integrationType: category,
        },
      },
      orderBy: [
        {
          updatedAt: 'asc',
        },
      ],
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
      orderBy: [
        {
          updatedAt: 'asc',
        },
      ],
      include: {
        integrationDefinition: true,
      },
    });
  }

  async updateIntegrationAccount(
    integrationAccountId: string,
    updateIntegrationAccountBody: UpdateIntegrationAccountBody,
  ) {
    if (updateIntegrationAccountBody.syncEnabled) {
      const integrationAccount = await this.getIntegrationAccountWithId({
        integrationAccountId,
      });

      if (
        integrationAccount.integrationDefinition.integrationType !==
        IntegrationType.TICKETING
      ) {
        throw new BadRequestException(
          'Sync currently is only supported to ticketing category',
        );
      }
    }
    const integrationAccount =
      await this.prismaService.integrationAccount.update({
        data: {
          integrationAccountName:
            updateIntegrationAccountBody.integrationAccountName,
          integrationConfiguration: updateIntegrationAccountBody.config,
          syncEnabled: updateIntegrationAccountBody.syncEnabled,
          syncPeriod: updateIntegrationAccountBody.syncPeriod,
        },
        where: {
          integrationAccountId,
        },
      });

    if (integrationAccount.syncEnabled) {
      await this.syncService.updateSchedule(integrationAccount);
    } else {
      await this.syncService.deleteSyncSchedule(integrationAccount);
    }

    return integrationAccount;
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

  async runProxyCommand(
    integrationAccountId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    method: string,
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryParams: any,
  ) {
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
      path,
      method,
      integrationAccount.integrationConfiguration as Config,
      integrationAccount.authType,
      {
        requestBody: body.postBody,
        queryParams,
      },
    );
  }

  async init() {
    const integrationAccounts =
      await this.prismaService.integrationAccount.findMany({
        where: {
          syncEnabled: true,
        },
      });

    await this.syncService.initiate(integrationAccounts);
  }
}
