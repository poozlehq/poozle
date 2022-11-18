/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommand } from 'service/command_helper';
import { getExtensionSpec, getExtensionSpecData } from 'service/extension';
import { useCommandInformation } from 'service/location_helper';

import { LoaderWithHeader } from 'components';

import { CommandsContext } from 'context/commands_context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function specChecker(Component: React.FC<any>) {
  return () => {
    const [loading, setLoading] = useState(true);
    const { extensionId, commandKey } = useCommandInformation();
    const navigate = useNavigate();
    const { commands } = useContext(CommandsContext);
    const command = useCommand(commands, extensionId, commandKey);

    // If spec.length not 0 and specData is not found in the data this
    // navigates to the SpecView page
    const getPreData = useCallback(async () => {
      try {
        const spec = await getExtensionSpec(command.extension_id);
        const specData = await getExtensionSpecData(command.extension_id);
        if (!specData && spec?.inputBlocks.length > 0) {
          navigate(`/spec/${extensionId}/${commandKey}`);
        }
      } catch (e) {
        console.log(e);
        navigate(`/spec/${extensionId}/${commandKey}`);
      }
      setLoading(false);
    }, [command.extension_id, commandKey, extensionId, navigate]);

    useEffect(() => {
      getPreData();
    }, [getPreData]);

    if (loading) {
      return <LoaderWithHeader />;
    }

    return <Component />;
  };
}
