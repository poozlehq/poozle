/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import supertokens from 'supertokens-node';

import type { CorsConfig, NestConfig } from 'common/configs/config.interface';

import { SupertokensExceptionFilter } from 'modules/auth/auth.filter';
import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    new SupertokensExceptionFilter(),
  );

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');

  // Check for schedules at start of the application
  const integrationAccountService = app.get(IntegrationAccountService);
  integrationAccountService.init();

  // Cors
  if (corsConfig.enabled) {
    app.enableCors({
      origin: configService.get('FRONTEND_HOST').split(',') || '',
      allowedHeaders: [
        'content-type',
        ...supertokens.getAllCORSHeaders(),
        'integrationaccountid',
        'workspaceid',
      ],
      credentials: true,
    });
  }

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Poozle')
    .setDescription('The poozle API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
