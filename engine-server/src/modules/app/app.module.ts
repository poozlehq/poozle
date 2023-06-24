/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import config, { config as defaultConfig } from 'common/configs/config';
import { loggingMiddleware } from 'common/middleware/logging.middleware';

import { AnalyticsModule } from 'modules/analytics/analytics.module';
import { AuthModule } from 'modules/auth/auth.module';
import { TicketingModule } from 'modules/categories/ticketing/ticketing.module';
import { IntegrationAccountModule } from 'modules/integration_account/integration_account.module';
import { IntegrationDefinitionModule } from 'modules/integration_definition /integration_definition.module';
import { IntegrationOAuthModule } from 'modules/integration_oauth/integration_oauth.module';
import { OAuthCallbackModule } from 'modules/oauth_callback/oauth_callback.module';
import { UserModule } from 'modules/user/user.module';
import { WorkspaceModule } from 'modules/workspace/workspace.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
      },
    }),
    AuthModule.forRoot({
      connectionURI: defaultConfig.superToken.connectionURI,
      appInfo: defaultConfig.superToken.appInfo,
    }),
    UserModule,
    WorkspaceModule,
    AnalyticsModule,
    IntegrationAccountModule,
    IntegrationDefinitionModule,
    IntegrationOAuthModule,
    OAuthCallbackModule,
    // Categories and their modules
    TicketingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
