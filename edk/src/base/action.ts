import { AxiosRequestHeaders } from 'axios';
import { Surface } from '../builder';
import { Authentication } from '../types';

export enum ActionType {
  HTTP = 'http',
  SCRIPT = 'script',
}

export type ActionParams = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
};

export abstract class BaseAction {
  abstract type: ActionType;
  abstract key: string | RegExp;

  // Using this path for both Script and HTTP
  abstract path: string;

  abstract run(
    key: string,
    params: ActionParams,
    authentication: Authentication,
  ): Promise<Surface> | Surface | undefined;
}

export abstract class HTTPAction extends BaseAction {
  abstract baseUrl: string;

  defaultHeaders: AxiosRequestHeaders = {};
  type = ActionType.HTTP;
}
