/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { AnalyticsService } from 'modules/analytics/analytics.service';
import { ControllerService } from 'modules/controller/controller.service';
import { ExtensionDefinitionModule } from 'modules/extension_definition/extension_definition.module';
import { ExtensionDefinitionService } from 'modules/extension_definition/extension_definition.service';

import { ExtensionAccountResolver } from './extension_account.resolver';
import { ExtensionAccountService } from './extension_account.service';

@Module({
  imports: [PrismaModule, HttpModule, ExtensionDefinitionModule],
  controllers: [],
  providers: [
    ExtensionAccountService,
    PrismaService,
    ExtensionAccountResolver,
    ControllerService,
    AnalyticsService,
    ExtensionDefinitionService,
  ],
  exports: [ExtensionAccountService],
})
export class ExtensionAccountModule {}
