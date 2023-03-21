/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from 'fs';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import {
  AuthHeaderResponse,
  BaseGraphQLExtension,
  CheckResponse,
  Config,
  SpecResponse,
} from '@poozle/engine-edk';
import axios from 'axios';
import { GraphQLSchema } from 'graphql';

class GithubExtension extends BaseGraphQLExtension {
  async authHeaders(config: Config): AuthHeaderResponse {
    const token = config['token'] as string;

    return {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }

  async getURL(config: Config): Promise<string> {
    return `https://${config.shop_name}.myshopify.com/admin/api/2023-01/graphql.json`;
  }

  async getSchema(): Promise<GraphQLSchema> {
    const schema = await loadSchema('schema/schema.graphql', {
      loaders: [new GraphQLFileLoader()],
    });

    // TODO (harshith): Check this and match the types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return schema as any;
  }

  getSpec(): SpecResponse {
    const data = fs.readFileSync('./spec.json', 'utf8');

    return JSON.parse(data) as SpecResponse;
  }

  async checkCredentials(config: Config): CheckResponse {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const headers = (await this.authHeaders(config)) as any;
      const graphqlQuery = {
        query: `query shop {shop { name} }`,
      };
      const url = await this.getURL(config);

      const options = {
        method: 'POST',
        headers,
        data: JSON.stringify(graphqlQuery),
      };

      await axios(url, options);

      return { status: true, error: '' };
    } catch (e) {
      return { status: false, error: e };
    }
  }
}

export default GithubExtension;
