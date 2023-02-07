/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Workspace } from '@prisma/client';

import {
  WorkspaceCreateBody,
  WorkspaceRequestIdBody,
  WorkspaceRequestSlugBody,
} from './workspace.interface';
import { WorkspaceService } from './workspace.service';

@ApiTags('workspace')
@Controller('workspaces')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Post('create')
  async createWorkspace(
    @Body() workspaceData: WorkspaceCreateBody,
  ): Promise<Workspace> {
    return this.workspaceService.createWorkspace(workspaceData);
  }

  @Get('list')
  async getWorkspaces(): Promise<Workspace[]> {
    return this.workspaceService.getAllWorkspaces();
  }

  @Get('get')
  async getWorkspaceWithId(
    @Body() workspaceRequestIdBody: WorkspaceRequestIdBody,
  ): Promise<Workspace> {
    return this.workspaceService.getWorkspaceWithId(workspaceRequestIdBody);
  }

  @Get('get_by_slug')
  async getWorkspaceWithSlug(
    @Body() workspaceRequestSlugBody: WorkspaceRequestSlugBody,
  ): Promise<Workspace> {
    return this.workspaceService.getWorkspaceWithSlug(workspaceRequestSlugBody);
  }
}
