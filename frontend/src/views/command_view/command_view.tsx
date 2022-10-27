import { appDir } from '@tauri-apps/api/path';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';

import Loader from 'components/loader/loader';

import { Command } from 'types/common';
import { registerEsc } from 'utils/application';
import { specChecker } from 'wrapper/spec_checker';

import styles from './command_view.module.scss';

interface Props {
  command: Command;
  resetCommand: () => void;
}

const CommandView = ({ command, resetCommand }: Props) => {
  const [commandTree, setCommandTree] = useState<any[]>([]);
  const [CommandComponent, setCommandComponent] = useState<any | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const setLastView = useCallback(
    (completeReset = false): void => {
      if (completeReset) {
        resetCommand();
        return;
      }

      const newCommandTree = [...commandTree];
      newCommandTree.pop();

      if (newCommandTree.length === 0) {
        resetCommand();
      } else {
        setCommandTree(newCommandTree);
      }
    },
    [commandTree, resetCommand],
  );

  const getCommandView = useCallback(async () => {
    const appDirPath = await appDir();
    const userName = appDirPath.split('/')[2];
    const module = await import(
      `/Users/${userName}/Library/Application Support/com.poozlehq.dev/extensions/${command.extension_id}/index.jsx`
    );
    console.log(module);
    setCommandComponent(module.default);
  }, [command]);

  useEffect(() => {
    // getCommandResponse()
    getCommandView();
    registerEsc(setLastView);
    // TODO (harshith) this is causing infinite loop in case the ex deps are added
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className={styles.commandView}>
        <div className={styles.commandViewContainer}>
          <Loader />
        </div>
      </div>
    );
  }

  const currentCommand = commandTree[commandTree.length - 1];

  const childrenWithProps = React.Children.map(CommandComponent, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { happy: 'here' } as any);
    }
    return child;
  });

  console.log(childrenWithProps);

  return (
    <div className={styles.commandView}>
      <div className={styles.commandViewContainer}>
        {CommandComponent && childrenWithProps}
        {/* <CommandFooter command={command} currentCommand={currentCommand} /> */}
      </div>
    </div>
  );
};

export default specChecker(CommandView);
