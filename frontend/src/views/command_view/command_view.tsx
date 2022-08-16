import { useContext, useEffect, useState } from 'react';

import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import FormView from '../form_view/form_view';
import CommandFooter from './command_footer';

import { Command, ExtensionSpecDataType, getCommandView } from '../../utils/commands';
import { specChecker } from '../../wrapper/spec_checker';
import { registerEsc } from '../../utils/application';

import { SpecContext } from '../../context/spec_context';
import { CommandTreeContext } from '../../context/command_tree_context';

import { ViewType, CommandTreeRecord } from './types';

import styles from './command_view.module.scss';

type Props = {
  command: Command;
  resetCommand: () => void;
};

function CommandView({ command, resetCommand }: Props) {
  const [commandTree, setCommandTree] = useState<CommandTreeRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const specData = useContext(SpecContext) as ExtensionSpecDataType;

  useEffect(() => {
    getCommandResponse();
    registerEsc(setLastView);
  }, []);

  const setLastView = () => {
    const newCommandTree = [...commandTree];
    newCommandTree.pop();

    if (newCommandTree.length === 0) {
      resetCommand();
    } else {
      setCommandTree(newCommandTree);
    }
  };

  const getCommandResponse = async () => {
    const commandView = await getCommandView(command.extension_path, command.key, specData);
    const record = JSON.parse(commandView.record);

    setCommandTree([
      {
        command,
        record,
      },
    ]);
    setLoading(false);
  };

  if (loading || commandTree.length === 0) {
    return (
      <>
        <Header onBack={resetCommand} />
        <Loader />
      </>
    );
  }

  const currentCommand = commandTree[commandTree.length - 1];

  return (
    <CommandTreeContext.Provider
      value={{
        setCommandTree,
        commandTree,
      }}
    >
      <div className={styles.commandView}>
        <div className={styles.viewType}>
          {currentCommand.record.type === ViewType.Form && (
            <div className={styles.formView}>
              <FormView formData={currentCommand.record} resetCommand={resetCommand} />
            </div>
          )}
        </div>
        <CommandFooter command={command} currentCommand={currentCommand} />
      </div>
    </CommandTreeContext.Provider>
  );
}

export default specChecker(CommandView);
