/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Command, ExtensionSpec } from '@poozle/edk';
import * as React from 'react';
import { Location } from 'react-router-dom';
import { getExtensionSpec } from './extension';

export const useCommand = (
  commands: Command[],
  extensionId: string,
  commandId: string,
): Command => {
  return React.useMemo(
    () =>
      commands.find((command) => command.extension_id === extensionId && command.key === commandId),
    [commandId, commands, extensionId],
  ) as Command;
};

export interface UseSpec {
  loading: boolean;
  spec: ExtensionSpec | undefined;
}

export const useSpec = (extensionId: string): UseSpec => {
  const [loading, setLoading] = React.useState(true);
  const [spec, setSpec] = React.useState<ExtensionSpec | undefined>();

  const fetchData = React.useCallback(async () => {
    const spec = await getExtensionSpec(extensionId);
    setSpec(spec);
    setLoading(false);
  }, [extensionId]);

  React.useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return { loading, spec };
};

export const getCommandInfoFromLocation = (location: Location) => {
  const infoSplit = location.pathname.split('/');
  return { commandKey: infoSplit[3], extensionId: infoSplit[2] };
};
