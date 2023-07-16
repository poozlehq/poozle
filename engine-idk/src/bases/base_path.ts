/** Copyright (c) 2023, Poozle, all rights reserved. **/
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AxiosHeaders } from 'axios';
import { convertToModelKeys } from 'utils';

import { Config, Params } from 'types/integration';
import { Meta } from 'types/path';

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
    const responseFromRun: any = await this.run(method, headers, params, config);

    // if this is a request directly to the integration
    if (params.proxy) {
      return responseFromRun;
    }

    if (responseFromRun.meta && Array.isArray(responseFromRun.data)) {
      const data = responseFromRun.data.map((responseItem: any) =>
        this.convertToModel(
          responseItem,
          params.queryParams?.raw === true || params.queryParams?.raw === 'true' ? true : false,
        ),
      );

      const meta = await this.getMetaParams(responseFromRun, params);

      return {
        data,
        meta,
      };
    }

    return {
      data: this.convertToModel(
        responseFromRun,
        params.queryParams?.raw === true || params.queryParams?.raw === 'true' ? true : false,
      ),
    };
  }

  // Written by the integration
  async getMetaParams(response: any, params: Params): Promise<Meta> {
    const current_cursor =
      typeof params.queryParams?.cursor === 'string' ? params.queryParams?.cursor : '';

    const next_cursor = response.meta ? response.meta.next_cursor : '';
    const previous_cursor = response.meta ? response.meta.previous_cursor ?? '' : '';

    return {
      limit: 0,
      cursors: {
        previous: previous_cursor,
        current: current_cursor,
        next: next_cursor,
      },
    };
  }

  // Written by the integration
  async run(_method: string, _headers: AxiosHeaders, _params: Params, _config: Config) {
    return {};
  }
}
