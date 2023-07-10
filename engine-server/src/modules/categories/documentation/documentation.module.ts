/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationAccountModule } from 'modules/integration_account/integration_account.module';

import { BlockController } from './models/block/block.controller';
import { PageController } from './models/page/page.controller';

@Module({
  imports: [PrismaModule, HttpModule, IntegrationAccountModule],
  controllers: [PageController, BlockController],
  providers: [PrismaService],
  exports: [],
})
export class DocumentationModule {}
