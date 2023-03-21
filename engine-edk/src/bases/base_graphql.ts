/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import axios from "axios";
import { print, GraphQLSchema, GraphQLError } from "graphql";
import { GraphQLJSON } from "graphql-scalars";

import { typeDefs } from "./base_typeDefs";
import { getTypedefsForCredentialsAndSpec } from "./utils";
import {
  AuthHeaderResponse,
  BaseExtensionInterface,
  CheckResponse,
  Config,
  SchemaResponse,
  SpecResponse,
} from "../types";

export class BaseGraphQLExtension implements BaseExtensionInterface {
  url: string;

  // This function is written again in the extended class
  async getSchema(): Promise<GraphQLSchema> {
    const typeDefs = /* GraphQL */ `
      type Query {
      }
    `;

    return makeExecutableSchema({
      typeDefs,
    });
  }

  // This function is written again in the extended class
  async getSpec(): SpecResponse {
    return undefined;
  }

  // This function is written again in the extended class
  // This is to used to check if the credentials are valid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async checkCredentials(_config: Config): CheckResponse {
    return { status: false, error: "" };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async authHeaders(_config: Config): AuthHeaderResponse {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async headers(_config: Config): AuthHeaderResponse {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getURL(_config: Config): Promise<string> {
    return this.url;
  }

  // This is configured for the GRAPHQL extension
  // We are using graphql-tools converter to generate GRAPHQL Schema
  async schema(): SchemaResponse {
    // This is the executor which is called everytime a request is made
    // We use this to populate the auth Headers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const remoteExecutor = async ({ document, variables, context }: any) => {
      try {
        const credentials = context.config;
        const parsedHeaders = context.parsedHeaders;
        const query = print(document);
        const headers = await this.headers(credentials);
        const url = await this.getURL(context.config);
        const fetchResult = await axios.post(
          url,
          {
            query,
            variables,
          },
          {
            headers: {
              "Content-Type": "application/json",
              ...headers,
              ...parsedHeaders,
            },
          }
        );
        return fetchResult.data;
      } catch (e) {
        return Promise.reject(new GraphQLError(e));
      }
    };

    return {
      schema: await this.getSchema(),
      executor: remoteExecutor,
    };
  }

  /**
   * Will return additionalSchema adding
   * check, authHeaders, spec
   */
  async additionalSchema(): Promise<GraphQLSchema> {
    const resolvers = {
      Headers: GraphQLJSON,
      Spec: GraphQLJSON,
      Query: {
        getSpec: async () => ({ spec: await this.spec() }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        check: async (_: any, { config }: any) => await this.check(config),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getHeaders: async (_: any, { config }: any) => ({
          headers: await this.authHeaders(config),
        }),
      },
    };

    const spec = await this.getSpec();
    const { typeDefinitions, typesInput } =
      getTypedefsForCredentialsAndSpec(spec);

    return makeExecutableSchema({
      typeDefs: mergeTypeDefs([...typeDefinitions, ...typesInput, typeDefs]),
      resolvers,
    });
  }

  /*
    This will return the spec for the extension
  */
  async spec(): SpecResponse {
    return this.getSpec();
  }

  /*
    This function will be used when the extension is getting configured. We will use this to test with the
    credentials are valid.
  */
  async check(config: Config): CheckResponse {
    try {
      return await this.checkCredentials(config);
    } catch (err) {
      return {
        status: false,
        error: err.message as string,
      };
    }
  }
}
