/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';

import { PrismaModule } from 'modules/prisma/prisma.module';
import { PrismaService } from 'modules/prisma/prisma.service';

import { ExtensionAccountModule } from '../extension_account/extension_account.module';
import { SchemaBuilderService } from './schema_builder.service';

@Module({
  imports: [PrismaModule, ExtensionAccountModule],
  controllers: [],
  providers: [SchemaBuilderService, PrismaService],
  exports: [SchemaBuilderService],
})
export class SchemaBuilderModule {}
