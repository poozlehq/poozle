/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common';

import { AuthMiddleware } from './auth.middleware';
import { SupertokensService } from './supertokens/supertokens.service';

@Module({
  providers: process.env.SUPERTOKEN_CONNECTION_URI ? [SupertokensService] : [],
  exports: [],
  controllers: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot(): DynamicModule {
    return {
      providers: process.env.SUPERTOKEN_CONNECTION_URI
        ? [SupertokensService]
        : [],
      exports: [],
      imports: [],
      module: AuthModule,
    };
  }
}
