/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Link } from '@@generated/link/entities';

import {
  CreateLinkBody,
  LinkIdRequest,
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
  ): Promise<LinkResponse> {
    return await this.integrationConnectLinkService.getLink({
      linkId: integrationConnectLinkIdRequest.linkId,
    });
  }

  @Post()
  async createLink(
    @Body()
    createLinkBody: CreateLinkBody,
  ): Promise<Link> {
    return await this.integrationConnectLinkService.createLink(createLinkBody);
  }

  @Get()
  async getLinksForWorkspace(
    @Query()
    workspaceIdQueryRequest: WorkspaceIdQueryRequest,
  ): Promise<LinkResponse[]> {
    return await this.integrationConnectLinkService.getLinksForWorkspace(
      workspaceIdQueryRequest,
    );
  }
}
