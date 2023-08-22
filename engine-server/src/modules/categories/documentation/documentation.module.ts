/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { DataModule } from 'modules/data/data.module';
import { IntegrationAccountModule } from 'modules/integration_account/integration_account.module';

import { BlockController } from './models/block/block.controller';
import { BlockService } from './models/block/block.service';
import { PageController } from './models/page/page.controller';
import { PageService } from './models/page/page.service';

@Module({
  imports: [PrismaModule, HttpModule, IntegrationAccountModule, DataModule],
  controllers: [PageController, BlockController],
  providers: [PrismaService, BlockService, PageService],
  exports: [],
})
export class DocumentationModule {}
