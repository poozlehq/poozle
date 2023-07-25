/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { SyncService } from './sync.service';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [],
  providers: [PrismaService, SyncService],
  exports: [SyncService],
})
export class SyncModule {}
