/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAuthentication,
  getCommand,
  getOptionValues,
  getParams,
} from '../utils/cli';
import { logRecord, Record } from '../utils';

import {
  About,
  Authentication,
  Command,
  CommandType,
  DoParams,
} from '../types';
import { Surface } from '../builder';

function isPromise(value: any) {
  return Boolean(value && typeof value.then === 'function');
}

export abstract class BaseExtension {
  abstract name: string;
  abstract icon: string;
  abstract description: string;

  abstract spec(): Surface | undefined;

  abstract commands(): Array<Command>;

  abstract do(
    command_key: string,
    authentication: Authentication | undefined,
    params: DoParams | undefined,
  ): Promise<Surface> | Surface;

  abstract fetchData(
    action_id: string,
    authentication: Authentication | undefined,
    params: DoParams | undefined,
  ): Promise<any> | any;

  about(): About {
    return {
      name: this.name,
      description: this.description,
      icon: this.icon,
    };
  }

  run() {
    try {
      const command = getCommand(process.argv);

      switch (command) {
        case CommandType.Spec:
          if (this.spec()) {
            logRecord(Record(CommandType.Spec, this.spec()?.buildToJSON()));
          }
          break;
        case CommandType.About:
          logRecord(Record(CommandType.About, this.about()));
          break;
        case CommandType.Commands:
          logRecord(Record(CommandType.Commands, this.commands()));
          break;
        case CommandType.Do:
          // eslint-disable-next-line no-case-declarations
          const doResponse = this.do(
            getOptionValues(process.argv),
            getAuthentication(process.argv),
            getParams(process.argv),
          );

          if (isPromise(doResponse)) {
            (doResponse as Promise<Surface>).then((data: any) =>
              logRecord(Record(CommandType.Do, data.buildToJSON())),
            );
          } else {
            logRecord(
              Record(CommandType.Do, (doResponse as Surface).buildToJSON()),
            );
          }

          break;

        case CommandType.FetchData:
          // eslint-disable-next-line no-case-declarations
          const fetchResponse = this.fetchData(
            getOptionValues(process.argv, 'fetchData'),
            getAuthentication(process.argv),
            getParams(process.argv),
          );

          if (isPromise(fetchResponse)) {
            (fetchResponse as Promise<any>).then((data: any) =>
              logRecord(Record(CommandType.Do, data)),
            );
          } else {
            logRecord(Record(CommandType.Do, fetchResponse as any));
          }

          break;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
    }
  }
}
