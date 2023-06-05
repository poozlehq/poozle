import { AxiosHeaders } from 'axios';
import { Config, Params } from 'types/integration';

import { BaseModelInterface, Schema } from 'types/model';

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

  paths(): any[] {
    return [];
  }

  async run(path: string, method: string, headers: AxiosHeaders, params: Params, config: Config) {
    try {
      const paths = this.paths();

      const pathToRun = paths.find((p) => p.isPath(path, method));

      return await pathToRun.run(method, headers, params, config);
    } catch (err) {
      return {
        status: 'error',
        error: err,
      };
    }
  }
}
