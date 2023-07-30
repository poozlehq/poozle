/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma/dist/prisma.module';

import { DataService } from './data.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
