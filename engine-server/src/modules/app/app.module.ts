/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import config, { config as defaultConfig } from 'common/configs/config';
import { loggingMiddleware } from 'common/middleware/logging.middleware';

import { AnalyticsModule } from 'modules/analytics/analytics.module';
import { AuthModule } from 'modules/auth/auth.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
