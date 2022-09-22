import { useCallback, useContext, useEffect, useState } from 'react';

import Header from 'components/header/header';
import Loader from 'components/loader/loader';

import { CommandTreeContext } from 'context/command_tree_context';
import { SpecContext } from 'context/spec_context';
import { registerEsc } from 'utils/application';
import { Command, ExtensionSpecDataType, getCommandView } from 'utils/commands';
import { specChecker } from 'wrapper/spec_checker';

import FormView from '../form_view/form_view';
import SearchView from '../search_view/search_view';
import CommandFooter from './command_footer';
import styles from './command_view.module.scss';
import { CommandViewType, CommandTreeRecord } from './types';

interface Props {
  command: Command;
  resetCommand: () => void;
}

const CommandView = ({ command, resetCommand }: Props) => {
  const [commandTree, setCommandTree] = useState<CommandTreeRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const specData = useContext(SpecContext) as ExtensionSpecDataType;

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

  const getCommandResponse = useCallback(async () => {
    const commandView = await getCommandView(command.extension_path, command.key, specData);
    const record = JSON.parse(commandView.record);

    setCommandTree([
      {
        command,
        record,
      },
    ]);
    setLoading(false);
  }, [command, specData]);

  useEffect(() => {
    getCommandResponse();
    registerEsc(setLastView);
    // TODO (harshith) this is causing infinite loop in case the ex deps are added
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || commandTree.length === 0) {
    return (
      <div className={styles.commandView}>
        <div className={styles.commandViewContainer}>
          <Header onBack={resetCommand} />
          <Loader />
        </div>
      </div>
    );
  }

  const currentCommand = commandTree[commandTree.length - 1];

  return (
    <CommandTreeContext.Provider
      value={{
        setCommandTree,
        commandTree,
        setLastView,
      }}
    >
      <div className={styles.commandView}>
        <div className={styles.commandViewContainer}>
          <div className={styles.viewType}>
            {currentCommand.record.type === CommandViewType.Form && (
              <div className={styles.formView}>
                <FormView formData={currentCommand.record} resetCommand={resetCommand} />
              </div>
            )}
            {currentCommand.record.type === CommandViewType.Search && (
              <div className={styles.formView}>
                <SearchView searchData={currentCommand.record} resetCommand={resetCommand} />
              </div>
            )}
          </div>

          <CommandFooter command={command} currentCommand={currentCommand} />
        </div>
      </div>
    </CommandTreeContext.Provider>
  );
};

export default specChecker(CommandView);
