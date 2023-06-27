/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IntegrationConnectLinkController } from './integration_connect_link.controller';
import { IntegrationConnectLinkService } from './integration_connect_link.service';

@Module({
  imports: [PrismaModule],
  controllers: [IntegrationConnectLinkController],
  providers: [IntegrationConnectLinkService, PrismaService],
  exports: [IntegrationConnectLinkService],
})
export class IntegrationConnectLinkModule {}
