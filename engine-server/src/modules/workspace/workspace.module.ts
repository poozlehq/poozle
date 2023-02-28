/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { HttpModule } from '@nestjs/axios';

import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [],
  providers: [WorkspaceService, PrismaService, WorkspaceResolver],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
