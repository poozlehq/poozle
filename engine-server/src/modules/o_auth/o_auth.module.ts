/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { AnalyticsService } from 'modules/analytics/analytics.service';
import { ControllerService } from 'modules/controller/controller.service';
import { ExtensionAccountService } from 'modules/extension_account/extension_account.service';
import { ExtensionAuthService } from 'modules/extension_auth/extension_auth.service';
import { ExtensionDefinitionService } from 'modules/extension_definition/extension_definition.service';

import { OAuthController } from './o_auth.controller';
import { OAuthService } from './o_auth.service';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [OAuthController],
  providers: [
    OAuthService,
    PrismaService,
    ExtensionAuthService,
    AnalyticsService,
    ExtensionAccountService,
    ExtensionDefinitionService,
    ControllerService,
  ],
  exports: [OAuthService],
})
export class OAuthModule {}
