/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp.entity';

import {
  IntegrationOAuthCreateBody,
  IntegrationOAuthRequestIdBody,
  IntegrationOAuthRequestUpdateBody,
  IntegrationOAuthRequestWorkspaceIdBody,
  IntegrationOAuthRequestWorkspaceSlugBody,
} from './integration_oauth.interface';

@Injectable()
export class IntegrationOAuthService {
  constructor(private prisma: PrismaService) {}

  async getIntegrationOAuthsForWorkspace(
    integrationOAuthRequestWorkspaceIdBody: IntegrationOAuthRequestWorkspaceIdBody,
  ): Promise<IntegrationOAuthApp[]> {
    return await this.prisma.integrationOAuthApp.findMany({
      where: {
        workspaceId: integrationOAuthRequestWorkspaceIdBody.workspaceId,
      },
      include: {
        integrationDefinition: true,
      },
    });
  }

  async getIntegrationOAuthsForWorkspaceSlug(
    integrationOAuthRequestWorkspaceSlugBody: IntegrationOAuthRequestWorkspaceSlugBody,
  ): Promise<IntegrationOAuthApp[]> {
    const workspace = await this.prisma.workspace.findUnique({
      where: {
        slug: integrationOAuthRequestWorkspaceSlugBody.slug,
      },
    });

    return await this.prisma.integrationOAuthApp.findMany({
      where: {
        workspaceId: workspace.workspaceId,
      },
      include: {
        integrationDefinition: true,
      },
    });
  }

  async getIntegrationOAuthApp(
    integrationOAuthRequestIdBody: IntegrationOAuthRequestIdBody,
    workspaceId: string,
  ): Promise<IntegrationOAuthApp> {
    const integrationOAuthApps = await this.prisma.integrationOAuthApp.findMany(
      {
        where: {
          integrationOAuthAppId:
            integrationOAuthRequestIdBody.integrationOAuthAppId,
          workspaceId,
        },
        include: {
          integrationDefinition: true,
        },
      },
    );

    return integrationOAuthApps[0];
  }

  async getIntegrationOAuthAppWithId(
    integrationOAuthRequestIdBody: IntegrationOAuthRequestIdBody,
  ): Promise<IntegrationOAuthApp> {
    return await this.prisma.integrationOAuthApp.findUnique({
      where: {
        integrationOAuthAppId:
          integrationOAuthRequestIdBody.integrationOAuthAppId,
      },
      include: {
        integrationDefinition: true,
      },
    });
  }

  async createIntegrationOAuth(
    integrationOAuthCreate: IntegrationOAuthCreateBody,
  ) {
    return await this.prisma.integrationOAuthApp.create({
      data: {
        integrationDefinitionId: integrationOAuthCreate.integrationDefinitionId,
        clientId: integrationOAuthCreate.clientId,
        clientSecret: integrationOAuthCreate.clientSecret,
        scopes: integrationOAuthCreate.scopes,
        integrationOAuthAppName: integrationOAuthCreate.integrationOAuthAppName,
        workspaceId: integrationOAuthCreate.workspaceId,
      },
    });
  }

  async updateIntegrationOAuth(
    integrationOAuthAppId: string,
    integrationOAuthRequestUpdateBody: IntegrationOAuthRequestUpdateBody,
  ) {
    return await this.prisma.integrationOAuthApp.update({
      where: {
        integrationOAuthAppId,
      },
      data: {
        clientId: integrationOAuthRequestUpdateBody.clientId,
        clientSecret: integrationOAuthRequestUpdateBody.clientSecret,
        scopes: integrationOAuthRequestUpdateBody.scopes,
        integrationOAuthAppName:
          integrationOAuthRequestUpdateBody.integrationOAuthAppName,
      },
    });
  }
}
