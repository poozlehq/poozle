/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [WorkspaceService, PrismaService, WorkspaceResolver],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
