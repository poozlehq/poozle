/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { WebhookResolver } from './webhook.resolver';
import { WebhookService } from './webhook.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [WebhookService, PrismaService, WebhookResolver],
  exports: [WebhookService],
})
export class ExtensionRouterModule {}
