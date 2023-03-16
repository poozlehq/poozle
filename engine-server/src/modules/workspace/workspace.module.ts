/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { ControllerService } from 'modules/controller/controller.service';
import { HiveService } from 'modules/hive/hive.service';

import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [],
  providers: [
    WorkspaceService,
    PrismaService,
    WorkspaceResolver,
    ControllerService,
    HiveService,
  ],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
