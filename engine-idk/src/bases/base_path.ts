/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { AxiosHeaders } from 'axios';

import { Config, Params } from 'types/integration';
import { Meta } from 'types/path';
import { convertToModelKeys } from 'utils';

export class BasePath {
  pathRegex: RegExp;
  method: string | string[];
  schema: Record<string, any>;

  constructor(pathRegex: RegExp, method: string | string[], schema: Record<string, any>) {
    this.pathRegex = pathRegex;
    this.method =
      typeof method === 'string' ? method.toLowerCase() : method.map((m) => m.toLowerCase());
    this.schema = schema;
  }

  isMatchingMethod(method: string): boolean {
    if (typeof this.method === 'string') {
      return this.method === method.toLowerCase();
    }

    return this.method.includes(method.toLowerCase());
  }

  isPath(path: string, method: string): boolean {
    return this.pathRegex.test(path) && this.isMatchingMethod(method);
  }

  convertToModel(data: any, raw: boolean) {
    const raw_data = data['raw_data'];
    delete data['raw_data'];

    return convertToModelKeys(data, this.schema, raw_data, raw);
  }

  async baseRun(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const responseFromRun = await this.run(method, headers, params, config);

    // if this is a request directly to the integration
    if (params.proxy) {
      return responseFromRun;
    }

    if (Array.isArray(responseFromRun)) {
      const data = responseFromRun.map((responseItem: any) =>
        this.convertToModel(
          responseItem,
          params.queryParams?.raw === true || params.queryParams?.raw === 'true' ? true : false,
        ),
      );

      const meta = await this.getMetaParams(data, params);

      return {
        data,
        meta,
      };
    } else {
      return {
        data: this.convertToModel(
          responseFromRun,
          params.queryParams?.raw === true || params.queryParams?.raw === 'true' ? true : false,
        ),
      };
    }
  }

  // Written by the integration
  async getMetaParams(_data: any, _params: Params): Promise<Meta> {
    return {
      limit: 0,
      cursors: {
        before: '0',
        current: '0',
        next: '0',
      },
    };
  }

  // Written by the integration
  async run(_method: string, _headers: AxiosHeaders, _params: Params, _config: Config) {
    return {};
  }
}
