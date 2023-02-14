/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { makeExecutableSchema } from "@graphql-tools/schema";
import axios from "axios";
import { print, GraphQLSchema } from "graphql";

import {
  AuthHeaderResponse,
  BaseExtensionInterface,
  CheckResponse,
  Config,
  SchemaResponse,
  SpecResponse,
} from "../types";

const typeDefs = /* GraphQL */ `
  type Query {
  }
`;

export class BaseGraphQLExtension implements BaseExtensionInterface {
  url: string;

  // This function is written again in the extended class
  async getSchema(): Promise<GraphQLSchema> {
    return makeExecutableSchema({
      typeDefs,
    });
  }

  // This function is written again in the extended class
  getSpec(): SpecResponse {
    return undefined;
  }

  // This function is written again in the extended class
  // This is to used to check if the credentials are valid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async checkCredentials(_config: Config): CheckResponse {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async authHeaders(_config: Config): AuthHeaderResponse {
    return {};
  }

  // This is configured for the GRAPHQL extension
  // We are using graphql-tools converter to generate GRAPHQL Schema
  async schema(): SchemaResponse {
    // This is the executor which is called everytime a request is made
    // We use this to populate the auth Headers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const remoteExecutor = async ({ document, variables, context }: any) => {
      const credentials = context.config;
      const query = print(document);
      const authHeaders = await this.authHeaders(credentials);
      const fetchResult = await axios.post(
        this.url,
        {
          query,
          variables,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...authHeaders,
          },
        }
      );
      return fetchResult.data;
    };

    return {
      schema: await this.getSchema(),
      executor: remoteExecutor,
    };
  }

  spec(): SpecResponse {
    return this.getSpec();
  }

  check(config: Config): CheckResponse {
    return this.checkCredentials(config);
  }
}
