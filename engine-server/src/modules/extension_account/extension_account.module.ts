/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { HttpModule } from '@nestjs/axios'

import { ExtensionDefinitionService } from 'modules/extension_definition/extension_definition.service';

import { ExtensionAccountResolver } from './extension_account.resolver';
import { ExtensionAccountService } from './extension_account.service';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [],
  providers: [
    ExtensionAccountService,
    PrismaService,
    ExtensionAccountResolver,
    ExtensionDefinitionService,
  ],
  exports: [ExtensionAccountService],
})
export class ExtensionAccountModule {}
