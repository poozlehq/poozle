/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GLOBAL_CONFIG } from 'configs/global.config';
import { PrismaModule } from 'nestjs-prisma';
import { prismaDeleteSoftlyMiddleware } from 'shared/prisma.middleware';

import { LoggerMiddleware } from 'middlewares/logger.middleware';

import { ExtensionDefinitionModule } from 'modules/extension_definition/extension_definition.module';
import { ExtensionRouterModule } from 'modules/extension_router/extension_router.module';
import { LoggerModule } from 'modules/logger/logger.module';
import { WorkspaceModule } from 'modules/workspace/workspace.module';

import { ExtensionAccountModule } from '../extension_account/extension_account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LoggerModule,
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [prismaDeleteSoftlyMiddleware()],
      },
    }),
    WorkspaceModule,
    ExtensionDefinitionModule,
    ExtensionAccountModule,
    ExtensionRouterModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
