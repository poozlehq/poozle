/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { DataModule } from 'modules/data/data.module';
import { IntegrationAccountModule } from 'modules/integration_account/integration_account.module';

import { ChargeController } from './models/charge/charge.controller';
import { ChargeService } from './models/charge/charge.service';
import { DisputeController } from './models/dispute/dispute.controller';
import { DisputeService } from './models/dispute/dispute.service';

@Module({
  imports: [PrismaModule, HttpModule, IntegrationAccountModule, DataModule],
  controllers: [ChargeController, DisputeController],
  providers: [PrismaService, ChargeService, DisputeService],
  exports: [],
})
export class PaymentsModule {}
