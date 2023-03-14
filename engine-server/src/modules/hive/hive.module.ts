/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { HiveService } from './hive.service';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [],
  providers: [PrismaService, HiveService],
  exports: [HiveService],
})
export class HiveModule {}
