/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, PrismaService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
