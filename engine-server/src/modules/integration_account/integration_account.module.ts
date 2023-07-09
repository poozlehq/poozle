/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationDefinitionModule } from 'modules/integration_definition/integration_definition.module';
import { LinkModule } from 'modules/link/link.module';

import { IntegrationAccountController } from './integration_account.controller';
import { IntegrationAccountService } from './integration_account.service';

@Module({
  imports: [PrismaModule, HttpModule, IntegrationDefinitionModule, LinkModule],
  controllers: [IntegrationAccountController],
  providers: [PrismaService, IntegrationAccountService],
  exports: [IntegrationAccountService],
})
export class IntegrationAccountModule {}
