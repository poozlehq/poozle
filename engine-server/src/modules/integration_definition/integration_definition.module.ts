/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationDefinitionController } from './integration_definition.controller';
import { IntegrationDefinitionService } from './integration_definition.service';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [IntegrationDefinitionController],
  providers: [PrismaService, IntegrationDefinitionService],
  exports: [IntegrationDefinitionService],
})
export class IntegrationDefinitionModule {}
