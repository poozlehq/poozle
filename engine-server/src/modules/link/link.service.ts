/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { differenceInSeconds } from 'date-fns';
import { PrismaService } from 'nestjs-prisma';

import { Link } from '@@generated/link/entities';

import {
  CreateLinkBody,
  GetLinkRequest,
  WorkspaceIdQueryRequest,
} from './link.interface';

@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

  async createLink(createLinkBody: CreateLinkBody): Promise<Link> {
    return await this.prisma.link.create({
      data: createLinkBody,
    });
  }

  async getLink(getLinkRequest: GetLinkRequest) {
    const link = await this.prisma.link.findUnique({
      where: {
        linkId: getLinkRequest.linkId,
      },
      include: {
        IntegrationAccount: true,
      },
    });

    const differenceSeconds = differenceInSeconds(
      new Date(),
      new Date(link.createdAt),
    );

    return {
      expired: differenceSeconds < link.expiresIn ? false : true,
      ...link,
      integrationAccounts: link.IntegrationAccount.map(
        (integrationAccount) => ({
          integrationAccountId: integrationAccount.integrationAccountId,
          integrationDefinitionId: integrationAccount.integrationDefinitionId,
        }),
      ),
    };
  }

  async getLinksForWorkspace(workspaceIdQueryRequest: WorkspaceIdQueryRequest) {
    const links = await this.prisma.link.findMany({
      where: {
        workspaceId: workspaceIdQueryRequest.workspaceId,
      },
    });

    return links.map((link) => {
      const differenceSeconds = differenceInSeconds(
        new Date(),
        new Date(link.createdAt),
      );

      return {
        expired: differenceSeconds < link.expiresIn ? false : true,
        ...link,
      };
    });
  }
}
