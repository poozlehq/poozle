/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';

import { PrismaModule } from 'modules/prisma/prisma.module';
import { PrismaService } from 'modules/prisma/prisma.service';

import { ExtensionDefinitionController } from './extension_definition.controller';
import { ExtensionDefinitionService } from './extension_definition.service';

@Module({
  imports: [PrismaModule],
  controllers: [ExtensionDefinitionController],
  providers: [ExtensionDefinitionService, PrismaService],
  exports: [ExtensionDefinitionService],
})
export class ExtensionDefinitionModule {}
