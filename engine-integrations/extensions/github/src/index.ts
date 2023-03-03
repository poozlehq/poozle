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

import { GITHUB_API_URL } from './constants';

class GithubExtension extends BaseGraphQLExtension {
  url = GITHUB_API_URL;

  async authHeaders(config: Config): AuthHeaderResponse {
    const token = config['api_key'] as string;
    return {
      Authorization: `token ${token}`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }

  async getSchema(): Promise<GraphQLSchema> {
    const schema = await loadSchema('schema/github.graphql', {
      loaders: [new GraphQLFileLoader()],
    });

    return schema;
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
        query: `query me { viewer { login } }`,
      };

      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(graphqlQuery),
      };

      await axios(this.url, options);

      return { status: true };
    } catch (e) {
      return { status: false, error: e };
    }
  }
}

export default GithubExtension;
