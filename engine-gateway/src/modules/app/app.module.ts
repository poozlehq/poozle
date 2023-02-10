/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GLOBAL_CONFIG } from 'configs/global.config';
import { PrismaModule } from 'nestjs-prisma';
import { prismaDeleteSoftlyMiddleware } from 'shared/prisma.middleware';

import { SchemaBuilderModule } from '../schema_builder/schema_builder.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [prismaDeleteSoftlyMiddleware()],
      },
    }),
    SchemaBuilderModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
