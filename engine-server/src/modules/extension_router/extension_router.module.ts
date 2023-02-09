/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';

import { PrismaModule } from 'modules/prisma/prisma.module';
import { PrismaService } from 'modules/prisma/prisma.service';

import { ExtensionRouterService } from './extension_router.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [ExtensionRouterService, PrismaService],
  exports: [ExtensionRouterService],
})
export class ExtensionRouterModule {}
