import { ExtensionSpecDataType, Loader } from '@poozle/edk';
import { appDir } from '@tauri-apps/api/path';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';

import { Command } from 'types/common';
import { getExtensionSpecData } from 'utils/extension';
import { specChecker } from 'wrapper/spec_checker';

import CommandFooter from './command_footer';
import styles from './command_view.module.scss';

interface Props {
  command: Command;
  resetCommand: () => void;
}

export interface AppProps {
  commandKey: string;
  resetCommand: () => void;
}

const CommandView = ({ command, resetCommand }: Props) => {
  const [CommandComponent, setCommandComponent] = useState<
    React.LazyExoticComponent<React.ComponentType<AppProps>> | undefined
  >();
  const [specData, setSpecData] = useState<ExtensionSpecDataType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getSpecData = useCallback(async () => {
    const specData = await getExtensionSpecData(command.extension_id);
    setSpecData(specData);
  }, [command.extension_id]);

  const getCommandView = useCallback(async () => {
    setLoading(true);
    const appDirPath = await appDir();
    // Get the username from the path
    const userName = appDirPath.split('/')[2];
    // Dynamically import the app from the extensions folder
    const module = React.lazy(
      () =>
        import(
          `/Users/${userName}/Library/Application Support/com.poozlehq.dev/extensions/${command.extension_id}/index.jsx`
        ),
    );
    setCommandComponent(module);
    getSpecData();
    setLoading(false);
  }, [command, getSpecData]);

  useEffect(() => {
    getCommandView();
    // TODO (harshith) this is causing infinite loop in case the ex deps are added
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !CommandComponent || !specData) {
    return (
      <div className={styles.commandView}>
        <div className={styles.commandViewContainer}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.commandView}>
      <div className={styles.commandViewContainer}>
        <div className={styles.commandReactContainer}>
          <CommandComponent commandKey={command.key} resetCommand={resetCommand} />
        </div>
        <CommandFooter command={command} />
      </div>
    </div>
  );
};

export default specChecker(CommandView);
