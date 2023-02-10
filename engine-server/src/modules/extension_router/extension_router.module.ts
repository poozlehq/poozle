/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { ExtensionRouterService } from './extension_router.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [ExtensionRouterService, PrismaService],
  exports: [ExtensionRouterService],
})
export class ExtensionRouterModule {}
