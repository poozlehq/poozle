import { Surface } from '../builder';
import { Authentication, Command, DoParams } from '../types';

import { BaseExtension } from './base_extension';

export abstract class AbstractExtension extends BaseExtension {
  abstract get_commands<T>(): T[];

  commands(): Command[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.get_commands().map((command: any) => command.get());
  }

  callback(
    callback_id: string,
    authentication: Authentication | undefined,
    params: DoParams | undefined,
  ): Surface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getClassWithAction: any = this.get_commands().find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (command: any) => command.hasCallbackKey(callback_id),
    );

    if (getClassWithAction) {
      return getClassWithAction.callbackController(
        callback_id,
        params,
        authentication,
      );
    }

    throw new Error(`${callback_id} does not exist`);
  }

  do(
    command_key: string,
    authentication: Authentication | undefined,
    params: DoParams | undefined,
  ): Surface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getClassWithAction: any = this.get_commands().find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (command: any) => command.key === command_key,
    );

    if (getClassWithAction) {
      return getClassWithAction.doController(params, authentication);
    }

    throw new Error(`${command_key} does not exist`);
  }

  fetchData(
    action_id: string,
    authentication: Authentication | undefined,
    params: DoParams | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getClassWithAction: any = this.get_commands().find((command: any) =>
      command.hasFetchDataKey(action_id),
    );

    if (getClassWithAction) {
      return getClassWithAction.fetchDataController(
        action_id,
        params,
        authentication,
      );
    }

    throw new Error(`${action_id} does not exist`);
  }
}
