/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationAccountModule } from 'modules/integration_account/integration_account.module';

import { CollectionController } from './models/collection/collection.controller';
import { CommentController } from './models/comment/comment.controller';
import { TagController } from './models/tag/tag.controller';
import { TeamController } from './models/team/team.controller';
import { TicketsController } from './models/ticket/tickets.controller';
import { UsersController } from './models/users/users.controller';

@Module({
  imports: [PrismaModule, HttpModule, IntegrationAccountModule],
  controllers: [
    CollectionController,
    UsersController,
    TeamController,
    TicketsController,
    CommentController,
    TagController,
  ],
  providers: [PrismaService],
  exports: [],
})
export class TicketingModule {}
