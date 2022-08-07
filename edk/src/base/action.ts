import { AxiosRequestHeaders } from 'axios';
import { Surface } from '../builder';

export enum ActionType {
  HTTP = 'http',
  SCRIPT = 'script',
}

export abstract class BaseAction {
  abstract type: ActionType;
  abstract key: string;

  // Using this path for both Script and HTTP
  abstract path: string;

  abstract run(): Promise<Surface> | Surface | undefined;
}

export abstract class HTTPAction extends BaseAction {
  abstract baseUrl: string;
  abstract authentication: AxiosRequestHeaders;
}
