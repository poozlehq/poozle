/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Body, Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User, Workspace } from '@prisma/client';

import { MasterGuard } from 'modules/auth/master.guard';
import { CreateUserInput } from 'modules/user/user.interface';
import { UserService } from 'modules/user/user.service';
import { WorkspaceService } from 'modules/workspace/workspace.service';
import { UserRequestIdBody } from './management.interface';

@Controller({
  version: '1',
  path: 'management',
})
@ApiTags('Management')
export class ManagementController {
  private readonly logger = new Logger(ManagementController.name);

  constructor(
    private userService: UserService,
    private workspaceService: WorkspaceService,
  ) {}

  @Get('user/:user_id')
  @UseGuards(new MasterGuard())
  async getUserWithWorkspaces(
    @Param() params: UserRequestIdBody,
  ): Promise<User> {
    return await this.userService.getUser(params.user_id);
  }

  @Post('user')
  @UseGuards(new MasterGuard())
  async createUserWithWorkspace(
    @Body()
    inputData: CreateUserInput & { userId: string; workspaceId: string },
  ): Promise<{user: User, workspace: Workspace }> {
    this.logger.log("Creating or Fetching the user");
    const { userId, workspaceId, ...userData } = inputData;
    let user = await this.userService.getUser(userId);
    this.logger.log("User", user, !!user);
    if (user) {
      let workspace = user.Workspace.find(
        (w) => w.slug === inputData.workspaceId,
      );
      if (!workspace) {
        workspace = await this.workspaceService.createWorkspace(
          {
            slug: workspaceId,
          },
          user,
        );
      }
      return { user, workspace };
    }
    const newUser = await this.userService.createUser(userId, userData, workspaceId);
    return {
      user: newUser,
      workspace: newUser.workspace,
    }
  }

}
