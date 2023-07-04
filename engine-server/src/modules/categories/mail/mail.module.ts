/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationAccountModule } from 'modules/integration_account/integration_account.module';
import { MessagesController } from './models/message/message.controller';
import { ThreadsController } from './models/thread/thread.controller';

@Module({
  imports: [PrismaModule, HttpModule, IntegrationAccountModule],
  controllers: [MessagesController, ThreadsController],
  providers: [PrismaService],
  exports: [],
})
export class MailModule {}
