/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { HiveService } from 'modules/hive/hive.service';

import { MonitoringResolver } from './monitoring.resolver';
import { MonitoringService } from './monitoring.service';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [],
  providers: [
    PrismaService,
    MonitoringService,
    HiveService,
    MonitoringResolver,
  ],
  exports: [MonitoringService],
})
export class MonitoringModule {}
