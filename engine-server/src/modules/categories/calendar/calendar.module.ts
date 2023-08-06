/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationAccountModule } from 'modules/integration_account/integration_account.module';

import { CalendarController } from './models/calendar/calendars.controller';

@Module({
  imports: [PrismaModule, HttpModule, IntegrationAccountModule],
  controllers: [CalendarController],
  providers: [PrismaService],
  exports: [],
})
export class CalendarModule {}
