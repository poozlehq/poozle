/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'nestjs-prisma';

import config from 'common/configs/config';
import { loggingMiddleware } from 'common/middleware/logging.middleware';

import { AuthModule } from 'modules/auth/auth.module';
import { ControllerModule } from 'modules/controller/controller.module';
import { ExtensionAccountModule } from 'modules/extension_account/extension_account.module';
import { ExtensionDefinitionModule } from 'modules/extension_definition/extension_definition.module';
import { ExtensionRouterModule } from 'modules/extension_router/extension_router.module';
import { HiveModule } from 'modules/hive/hive.module';
import { UserModule } from 'modules/user/user.module';
import { WorkspaceModule } from 'modules/workspace/workspace.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlConfigService } from '../gql-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
      },
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AuthModule,
    UserModule,
    ControllerModule,
    ExtensionAccountModule,
    ExtensionDefinitionModule,
    ExtensionRouterModule,
    WorkspaceModule,
    HiveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
