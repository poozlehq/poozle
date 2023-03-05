/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { ExtensionRouterResolver } from './extension_router.resolver';
import { ExtensionRouterService } from './extension_router.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [ExtensionRouterService, PrismaService, ExtensionRouterResolver],
  exports: [ExtensionRouterService],
})
export class ExtensionRouterModule {}
