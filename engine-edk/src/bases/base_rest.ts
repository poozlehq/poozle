/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { createGraphQLSchema } from "openapi-to-graphql-poozle-fork";

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

  // This function is written again in the extended class
  async getSchema(): Promise<string> {
    return "";
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

  spec(): SpecResponse {
    return this.getSpec();
  }

  check(config: Config): CheckResponse {
    return this.checkCredentials(config);
  }
}
