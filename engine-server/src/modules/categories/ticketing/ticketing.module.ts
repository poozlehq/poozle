/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { DataModule } from 'modules/data/data.module';
import { IntegrationAccountModule } from 'modules/integration_account/integration_account.module';

import { CollectionController } from './models/collection/collection.controller';
import { CollectionService } from './models/collection/collection.service';
import { CommentController } from './models/comment/comment.controller';
import { TagController } from './models/tag/tag.controller';
import { TeamController } from './models/team/team.controller';
import { TicketService } from './models/ticket/ticket.service';
import { TicketsController } from './models/ticket/tickets.controller';
import { UsersController } from './models/users/users.controller';
import { TicketTypesController } from './models/ticket_type/ticket_type.controller';

@Module({
  imports: [PrismaModule, HttpModule, IntegrationAccountModule, DataModule],
  controllers: [
    CollectionController,
    UsersController,
    TeamController,
    TicketsController,
    TicketTypesController,
    CommentController,
    TagController,
  ],
  providers: [PrismaService, CollectionService, TicketService],
  exports: [],
})
export class TicketingModule {}
