import classnames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { IconArrowRightCircle } from '@tabler/icons';
import { Chip } from '@mantine/core';

import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import { Image } from '../../components/image';
import FormView from '../form_view/form_view';

import { Command, ExtensionSpecDataType, getCommandView } from '../../utils/commands';
import { capitalizeFirstLetter } from '../../utils/common';
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
        {currentCommand.record.type === ViewType.Form && (
          <div className={styles.formView}>
            <div className={styles.form}>
              <FormView formData={currentCommand.record} resetCommand={resetCommand} />
            </div>
            <div className={styles.footer}>
              <div className={styles.icon}>
                <Image src={command.icon} html_renderer />
              </div>
              <div className={styles.commandTree}>
                <Chip size="xs" checked={false}>
                  {capitalizeFirstLetter(command.extension_id)}
                </Chip>
                {commandTree.map((treeNode, index) => (
                  <>
                    <IconArrowRightCircle className={styles.rightArrowIcon} />
                    <Chip
                      size="xs"
                      checked={false}
                      className={classnames({ [styles.active]: index === commandTree.length - 1 })}
                    >
                      {treeNode.command.name}
                    </Chip>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </CommandTreeContext.Provider>
  );
}

export default specChecker(CommandView);
