/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { AxiosHeaders } from 'axios';
import { Config, Params } from 'types/integration';

import { BaseModelInterface, Schema } from 'types/model';
import { BasePath } from './base_path';

export class BaseModel implements BaseModelInterface {
  name: string;
  schema: Schema;

  constructor(name: string, schema: Schema) {
    this.name = name;
    this.schema = schema;
  }

  hasPath(path: string, method: string): boolean {
    const paths = this.paths();
    const pathExists = paths.find((p) => p.isPath(path, method));

    return pathExists ? true : false;
  }

  paths(): BasePath<any>[] {
    return [];
  }

  async run(path: string, method: string, headers: AxiosHeaders, params: Params, config: Config) {
    try {
      const paths = this.paths();

      const pathToRun: BasePath<any> | undefined = paths.find((p) => p.isPath(path, method));

      if (pathToRun) {
        return await pathToRun.baseRun(method, headers, params, config);
      }

      return {
        status: 'error',
        error: 'Path not found',
      };
    } catch (err) {
      return {
        status: 'error',
        error: err,
      };
    }
  }
}
