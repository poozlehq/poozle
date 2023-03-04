/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";
import { GraphQLJSON } from "graphql-scalars";
import { createGraphQLSchema } from "openapi-to-graphql-poozle-fork";

import { typeDefs } from "./base_typeDefs";
import {
  AuthHeaderResponse,
  BaseExtensionInterface,
  BaseURLResponse,
  CheckResponse,
  Config,
  Context,
  SchemaResponse,
  SpecResponse,
} from "../types";

export class BaseRestExtension implements BaseExtensionInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async baseURL(_context: Context): BaseURLResponse {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async qs(_config: Config): Promise<Record<string, string>> {
    return {};
  }

  // This function is written again in the extended class
  async getSchema(): Promise<string> {
    return "";
  }

  // This function is written again in the extended class
  async getSpec(): SpecResponse {
    return undefined;
  }

  // This function is written again in the extended class
  // This is to used to check if the credentials are valid
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async checkCredentials(_config: Config): CheckResponse {
    return { status: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async authHeaders(_config: Config): AuthHeaderResponse {
    return {};
  }

  // This is configured for the REST extension
  // We are using openapi-to-graphql converter to generate GRAPHQL Schema
  async schema(): SchemaResponse {
    // Mapped to any as it will be defaulted to OAS 3
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schemaString = (await this.getSchema()) as any;

    const { schema } = await createGraphQLSchema(schemaString, {
      baseUrl: (context: Context) => {
        return this.baseURL(context);
      },
      qs: (
        method: string,
        path: string,
        _title,
        context: { context: Context }
      ) => {
        if (context) {
          const credentials = context?.context.config;

          return this.qs({
            ...credentials,
            context: { method, path },
          });
        }

        return {};
      },
      headers: (
        method: string,
        path: string,
        _title,
        context: { context: Context }
      ) => {
        if (context) {
          const credentials = context?.context.config;

          return this.authHeaders({
            ...credentials,
            context: { method, path },
          });
        }

        return {};
      },
    });

    return schema;
  }

  /**
   * Will return additionalSchema adding
   * check, authHeaders, spec
   */
  additionalSchema(): GraphQLSchema {
    const resolvers = {
      Spec: GraphQLJSON,
      Config: GraphQLJSON,
      Headers: GraphQLJSON,
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

    return makeExecutableSchema({ typeDefs, resolvers });
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
  async check(config: string): CheckResponse {
    try {
      const buff = new Buffer(config, "base64");
      const configJSON = buff.toString("utf8");
      return await this.checkCredentials(JSON.parse(configJSON) as Config);
    } catch (err) {
      return {
        status: false,
        error: err.message as string,
      };
    }
  }
}
