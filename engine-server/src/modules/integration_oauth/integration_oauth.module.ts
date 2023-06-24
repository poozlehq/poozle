/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationOAuthController } from './integration_oauth.controller';
import { IntegrationOAuthService } from './integration_oauth.service';

@Module({
  imports: [PrismaModule],
  controllers: [IntegrationOAuthController],
  providers: [IntegrationOAuthService, PrismaService],
  exports: [IntegrationOAuthService],
})
export class IntegrationOAuthModule {}
