/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionSpecDataType } from '@poozle/edk';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCommand } from 'service/command_helper';
import { getExtensionSpec, getExtensionSpecData, getExtensionViewURL } from 'service/extension';
import { useCommandInformation } from 'service/location_helper';

import { LoaderWithHeader } from 'components';

import { specChecker } from 'wrapper/spec_checker';

import { CommandsContext } from 'context/commands_context';

import { RemoteComponent } from '../../RemoteComponent';
import CommandFooter from './command_footer';
import styles from './command_view.module.scss';

export interface AppProps {
  commandKey: string;
  resetCommand: () => void;
  specData: ExtensionSpecDataType;
}

const CommandViews = () => {
  const { extensionId, commandKey } = useCommandInformation();
  const { commands } = useContext(CommandsContext);
  const command = useCommand(commands, extensionId, commandKey);
  const navigate = useNavigate();
  const [componentViewURL, setComponentViewURL] = useState<string | undefined>();
  const [specData, setSpecData] = useState<ExtensionSpecDataType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getSpecData = useCallback(async () => {
    const spec = await getExtensionSpec(command.extension_id);
    if (spec?.inputBlocks.length > 0) {
      const specData = await getExtensionSpecData(command.extension_id);
      setSpecData(specData);
    }
  }, [command.extension_id]);

  const getCommandView = useCallback(async () => {
    setLoading(true);
    getSpecData();
    const componentViewURL = await getExtensionViewURL(command.extension_id);
    setComponentViewURL(componentViewURL);
    setLoading(false);
  }, [command.extension_id, getSpecData]);

  useEffect(() => {
    getCommandView();
    // TODO (harshith) this is causing infinite loop in case the ex deps are added
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !componentViewURL) {
    return <LoaderWithHeader />;
  }

  const resetCommand = () => {
    navigate('/search');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CommandViewComponent = (props: any) => (
    <RemoteComponent
      url={componentViewURL}
      render={({ err, Component }) =>
        err ? (
          <div>{err.toString()}</div>
        ) : (
          <Component
            {...props}
            commandKey={command.key}
            specData={specData}
            resetCommand={resetCommand}
          />
        )
      }
    />
  );

  return (
    <div className={styles.commandView}>
      <div className={styles.commandViewContainer}>
        <div className={styles.commandReactContainer}>
          <CommandViewComponent />
        </div>
        <CommandFooter command={command} />
      </div>
    </div>
  );
};

export const CommandView = specChecker(CommandViews);
