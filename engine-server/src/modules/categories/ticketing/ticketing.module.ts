/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationAccountModule } from 'modules/integration_account/integration_account.module';

import { CollectionsController } from './models/collections/collections.controller';
import { TicketsController } from './models/tickets/tickets.controller';
import { UsersController } from './models/users/users.controller';

@Module({
  imports: [PrismaModule, HttpModule, IntegrationAccountModule],
  controllers: [UsersController, CollectionsController, TicketsController],
  providers: [PrismaService],
  exports: [],
})
export class TicketingModule {}
