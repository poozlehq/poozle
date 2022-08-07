import { PoozleDto, Surface } from '../builder';
import { Authentication, Command, DoParams } from '../types';

export abstract class AbstractCommand {
  abstract key: string;
  abstract name: string;
  abstract description: string;
  abstract icon: string;

  abstract fetchDataKeys: Array<string> | undefined;

  getFetchDataKeys(): Array<string> {
    return this.fetchDataKeys ? [...this.fetchDataKeys, this.key] : [];
  }

  hasFetchDataKey(key: string): boolean {
    return this.getFetchDataKeys().includes(key);
  }

  hasDoKey(key: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !!this.getActions<any>().find((action) => action.key === key);
  }

  get(): Command {
    return {
      key: this.key,
      name: this.name,
      description: this.description,
      icon: this.icon,
    };
  }

  abstract getActions<TCommandClass>(): TCommandClass[];

  abstract doController(
    params: DoParams | undefined,
    authentication: Authentication | undefined,
  ): Promise<Surface> | Surface | undefined;

  abstract fetchDataController(
    action_id: string,
    params: DoParams | undefined,
    authentication: Authentication | undefined,
  ): Readonly<PoozleDto> | Promise<Readonly<PoozleDto>> | undefined;
}
