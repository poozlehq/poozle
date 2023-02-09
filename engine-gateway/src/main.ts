/* eslint-disable dot-location */
/** Copyright (c) 2022, Poozle, all rights reserved. **/

// import * as fs from 'fs';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { stitchSchemas } from '@graphql-tools/stitch';
import { NestFactory } from '@nestjs/core';

import { SchemaBuilderService } from 'modules/schema_builder/schema_builder.service';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'error', 'warn'],
  });
  const schemaBuilderService = app.get(SchemaBuilderService);
  const schema = await schemaBuilderService.getSchema();

  const filteredSchema = schema.filter(Boolean);
  const gatewaySchema = stitchSchemas({
    subschemas: filteredSchema,
  });

  const server = new ApolloServer({
    schema: gatewaySchema,
  });

  const { url } = await startStandaloneServer(server);
  console.log(`🚀 GraphQL Server ready at ${url}`);
}

// Start all the servers
bootstrap();
