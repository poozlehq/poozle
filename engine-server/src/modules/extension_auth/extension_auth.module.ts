/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { ExtensionAuthResolver } from './extension_auth.resolver';
import { ExtensionAuthService } from './extension_auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [ExtensionAuthService, PrismaService, ExtensionAuthResolver],
  exports: [ExtensionAuthService],
})
export class ExtensionRouterModule {}
