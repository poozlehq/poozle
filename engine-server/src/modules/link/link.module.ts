/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationDefinitionModule } from 'modules/integration_definition/integration_definition.module';

import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [PrismaModule, IntegrationDefinitionModule],
  controllers: [LinkController],
  providers: [LinkService, PrismaService],
  exports: [LinkService],
})
export class LinkModule {}
