/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { ControllerModule } from 'modules/controller/controller.module';

import { ExtensionDefinitionResolver } from './extension_definition.resolver';
import { ExtensionDefinitionService } from './extension_definition.service';

@Module({
  imports: [PrismaModule, HttpModule, ControllerModule],
  controllers: [],
  providers: [
    ExtensionDefinitionService,
    PrismaService,
    ExtensionDefinitionResolver,
  ],
  exports: [ExtensionDefinitionService],
})
export class ExtensionDefinitionModule {}
