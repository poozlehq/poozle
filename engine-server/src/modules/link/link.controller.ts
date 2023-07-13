/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Link } from '@@generated/link/entities';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  CreateLinkBody,
  LinkIdRequest,
  LinkIdentifierQueryParams,
  LinkResponse,
  WorkspaceIdQueryRequest,
} from './link.interface';
import { LinkService } from './link.service';

@Controller({
  version: '1',
  path: 'link',
})
@ApiTags('Link')
export class LinkController {
  constructor(private integrationConnectLinkService: LinkService) {}

  @Get(':linkId')
  async getLink(
    @Param()
    integrationConnectLinkIdRequest: LinkIdRequest,
    @Query()
    accountIdentifierQueryParams: LinkIdentifierQueryParams,
  ): Promise<LinkResponse> {
    return await this.integrationConnectLinkService.getLink(
      {
        linkId: integrationConnectLinkIdRequest.linkId,
      },
      accountIdentifierQueryParams,
    );
  }

  @Post()
  @UseGuards(new AuthGuard())
  async createLink(
    @Body()
    createLinkBody: CreateLinkBody,
  ): Promise<Link> {
    return await this.integrationConnectLinkService.createLink(createLinkBody);
  }

  @Get()
  @UseGuards(new AuthGuard())
  async getLinksForWorkspace(
    @Query()
    workspaceIdQueryRequest: WorkspaceIdQueryRequest,
  ): Promise<LinkResponse[]> {
    return await this.integrationConnectLinkService.getLinksForWorkspace(
      workspaceIdQueryRequest,
    );
  }
}
