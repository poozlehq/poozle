/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { appWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';

import { Command as CommandType } from 'types/common';

import styles from './App.module.scss';
import Search from './components/search/search';
import { CommandContext } from './context/command_context';
import { CommandsContext } from './context/commands_context';
import { getAllCommands, prefillCommandsForExtension } from './utils/extension';
import CommandView from './views/command_view/command_view';

const App = () => {
  const [commands, setCommands] = useState<CommandType[]>([]);
  const [currentCommand, setCurrentCommand] = useState<CommandType>();

  useEffect(() => {
    getCommands();
    registerForBlur();
  }, []);

  const resetCommand = () => {
    setCurrentCommand(undefined);
  };

  const registerForBlur = async () => {
    // Close the window when tauri is blurred
    // appWindow.listen('tauri://blur', () => {
    //   appWindow.hide();
    // });
  };

  async function getCommands() {
    const commands = await getAllCommands();
    setCommands(commands);
  }

  const onCommandSelect = (command: CommandType) => {
    setCurrentCommand(command);
  };

  return (
    <div className={styles.app}>
      <CommandsContext.Provider value={commands}>
        {currentCommand ? (
          <CommandContext.Provider value={currentCommand}>
            <CommandView command={currentCommand} resetCommand={resetCommand} />
          </CommandContext.Provider>
        ) : (
          <Search onCommandSelect={onCommandSelect} resetCommand={resetCommand} />
        )}
      </CommandsContext.Provider>
    </div>
  );
};

export default App;
