import { PoozleDto, Surface } from '../builder';
import { Authentication, Command, DoParams } from '../types';

export abstract class AbstractCommand {
  abstract key: string;
  abstract name: string;
  abstract description: string;
  abstract icon: string;

  abstract fetchDataKeys: Array<string> | undefined;
  abstract callbackKeys: Array<string> | undefined;

  getFetchDataKeys(): Array<string> {
    return this.fetchDataKeys ? [...this.fetchDataKeys, this.key] : [];
  }

  getCallbackKeys(): Array<string> {
    return this.callbackKeys ? [...this.callbackKeys, this.key] : [];
  }

  hasCallbackKey(key: string): boolean {
    return this.getCallbackKeys().includes(key);
  }

  hasFetchDataKey(key: string): boolean {
    return this.getFetchDataKeys().includes(key);
  }

  get(): Command {
    return {
      key: this.key,
      name: this.name,
      description: this.description,
      icon: this.icon,
    };
  }

  abstract doController(
    params: DoParams | undefined,
    authentication: Authentication | undefined,
  ): Promise<Surface> | Surface | undefined;

  abstract fetchDataController(
    action_id: string,
    params: DoParams | undefined,
    authentication: Authentication | undefined,
  ): Readonly<PoozleDto> | Promise<Readonly<PoozleDto>> | undefined;

  abstract callbackController(
    callback_id: string,
    params: DoParams | undefined,
    authentication: Authentication | undefined,
  ): Promise<Surface> | Surface | undefined;
}
