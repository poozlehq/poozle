/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

import { GraphqlConfig } from '../common/configs/config.interface';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}
  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphqlConfig>('graphql');

    return {
      // schema options
      cors: {
        origin: this.configService.get('FRONTEND_HOST') ? this.configService.get('FRONTEND_HOST').split(','): null,
        credentials: true,
      },
      autoSchemaFile: graphqlConfig.schemaDestination || 'src/schema.graphql',
      sortSchema: graphqlConfig.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      // subscription
      installSubscriptionHandlers: true,
      debug: graphqlConfig.debug,
      playground: graphqlConfig.playgroundEnabled,
      resolvers: { JSON: GraphQLJSON },
      context: ({ req, res }) => ({ req, res }),
    };
  }
}
