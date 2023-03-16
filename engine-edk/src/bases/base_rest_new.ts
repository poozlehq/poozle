/** Copyright (c) 2023, Poozle, all rights reserved. **/

/**
 * We have seen that some spec work with mesh openapi conversion
 * and some with the openapi-to-graphql package.
 * We will be moving to mesh based extensions soon
 */
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadGraphQLSchemaFromOpenAPI } from "@omnigraph/openapi";
import { GraphQLError, GraphQLSchema } from "graphql";
import { GraphQLJSON } from "graphql-scalars";

import { typeDefs } from "./base_typeDefs";
import { getConfigJSON } from "./utils";
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

export class BaseRestExtensionNew implements BaseExtensionInterface {
  name: string;

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
    const schema = await loadGraphQLSchemaFromOpenAPI(this.name, {
      source: "schema/schema.json",
      cwd: ".",
      fetch: async (
        url: string,
        options?: RequestInit,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context?: any
      ): Promise<Response> => {
        const config = getConfigJSON(context.req.headers.config);
        const headers = await this.authHeaders({
          config,
          context: { method: options.method, path: url },
        });

        try {
          return await fetch(url, {
            method: options?.method || "get",
            headers: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...(options?.headers as any),
              ...headers,
            },
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          throw new GraphQLError(e);
        }
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
