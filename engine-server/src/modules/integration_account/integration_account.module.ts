/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationAccountController } from './integration_account.controller';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [IntegrationAccountController],
  providers: [PrismaService],
  exports: [],
})
export class IntegrationAccountModule {}
