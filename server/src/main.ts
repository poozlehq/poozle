/* eslint-disable dot-location */
/** Copyright (c) 2022, Poozle, all rights reserved. **/

import * as fs from 'fs';
import * as path from 'path';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { stitchSchemas } from '@graphql-tools/stitch';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { Oas3, createGraphQLSchema } from 'openapi-to-graphql';

import { SwaggerConfig } from './configs/config.interface';
import { GLOBAL_CONFIG } from './configs/global.config';
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter';
import { AppModule } from './modules/app/app.module';
import { MyLogger } from './modules/logger/logger.service';
import { API_PREFIX } from './shared/constants/global.constants';

function readFile(path: string): Oas3 {
  if (/json$/.test(path)) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }
  throw new Error(
    `Failed to parse JSON/YAML. Ensure file '${path}' has ` +
      `the correct extension (i.e. '.json', '.yaml', or '.yml).`,
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'error', 'warn'],
  });

  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalFilters(
    // TODO: uncomment when ready
    // new GlobalExceptionFilter(),

    new InvalidFormExceptionFilter(),
  );

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get<ConfigService>(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Poozle')
      .setDescription(swaggerConfig.description || 'The Poozle API description')
      .setVersion(swaggerConfig.version || '1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  const PORT = process.env.PORT || GLOBAL_CONFIG.nest.port;
  await app.listen(PORT, async () => {
    const myLogger = await app.resolve(MyLogger);
    myLogger.log(`Server started listening: ${PORT}`);
  });

  // Pass the ApolloGateway to the ApolloServer constructor
  // async function remoteExecutor({ document, variables }: any) {
  //   const query = graphql.print(document);
  //   const fetchResult = await fetch('https://api.github.com/graphql', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'token ',
  //     },
  //     body: JSON.stringify({ query, variables }),
  //   });

  //   try {
  //     return fetchResult.json();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async function remoteExecutor(context: any) {
    console.log(context);

    return {}
  }

  const githubContent = readFile(path.resolve('../server/github.json'));
  const { schema, report } = await createGraphQLSchema(githubContent, {
    headers: () => {
      console.log('here');
      return {};
    },
  });

  console.log(report);

  // const githubSubSchema = {
  //   schema: await introspectSchema(remoteExecutor),
  //   executor: remoteExecutor,
  // };

  const githubScema = { schema, executor: remoteExecutor }
  const gatewaySchema = stitchSchemas({
    subschemas: [githubScema],
  });

  const server = new ApolloServer({
    schema: gatewaySchema,
  });

  const { url } = await startStandaloneServer(server);
  console.log(`🚀 GraphQL Server ready at ${url}`);
}

// Start all the servers
bootstrap();
