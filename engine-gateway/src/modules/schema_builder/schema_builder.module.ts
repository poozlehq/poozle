/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { SchemaBuilderService } from './schema_builder.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [],
  providers: [SchemaBuilderService, PrismaService],
  exports: [SchemaBuilderService],
})
export class SchemaBuilderModule {}
