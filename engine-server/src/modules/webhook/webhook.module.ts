/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { WebhookService } from './webhook.service';
import {WebhookController} from './webhook.controller';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [WebhookController],
  providers: [WebhookService, PrismaService],
  exports: [WebhookService],
})
export class WebhookModule {}
