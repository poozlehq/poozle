/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { AxiosHeaders } from 'axios';

import { Config, Params } from 'types/integration';

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

  async run(
    _method: string,
    _headers: AxiosHeaders,
    _params: Params,
    _config: Config,
  ): Promise<any> {}
}
