/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';
import { IntegrationDefinitionService } from 'modules/integration_definition /integration_definition.service';
import { IntegrationOAuthService } from 'modules/integration_oauth/integration_oauth.service';
import { LinkModule } from 'modules/link/link.module';

import { OAuthCallbackController } from './oauth_callback.controller';
import { OAuthCallbackService } from './oauth_callback.service';

@Module({
  imports: [PrismaModule, HttpModule, LinkModule],
  controllers: [OAuthCallbackController],
  providers: [
    OAuthCallbackService,
    PrismaService,
    IntegrationOAuthService,
    IntegrationDefinitionService,
    IntegrationAccountService,
  ],
  exports: [OAuthCallbackService],
})
export class OAuthCallbackModule {}
