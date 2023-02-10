/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { ExtensionDefinitionService } from '../extension_definition/extension_definition.service';
import { ExtensionAccountController } from './extension_account.controller';
import { ExtensionAccountService } from './extension_account.service';

@Module({
  imports: [PrismaModule],
  controllers: [ExtensionAccountController],
  providers: [
    ExtensionAccountService,
    PrismaService,
    ExtensionDefinitionService,
  ],
  exports: [ExtensionAccountService],
})
export class ExtensionAccountModule {}
