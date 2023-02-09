/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'modules/prisma/prisma.module';
import { PrismaService } from 'modules/prisma/prisma.service';

import { SchemaBuilderService } from './schema_builder.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [],
  providers: [SchemaBuilderService, PrismaService],
  exports: [SchemaBuilderService],
})
export class SchemaBuilderModule {}
