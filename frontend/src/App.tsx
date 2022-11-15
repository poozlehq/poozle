/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { appWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { useSegmentTrack } from 'react-segment-analytics';

import { Command as CommandType } from 'types/common';

import styles from './App.module.scss';
import { CommandContext } from './context/command_context';
import { CommandsContext } from './context/commands_context';
import { getAllCommands } from './utils/extension';
import CommandView from './views/command_view/command_view';
import { Search } from './views/search';

const App = () => {
  const [commands, setCommands] = useState<CommandType[]>([]);
  const [currentCommand, setCurrentCommand] = useState<CommandType>();
  const track = useSegmentTrack();

  useEffect(() => {
    getCommands();
    registerForBlur();
  }, []);

  const resetCommand = () => {
    setCurrentCommand(undefined);
  };

  const registerForBlur = async () => {
    // Close the window when tauri is blurred
    appWindow.listen('tauri://blur', () => {
      // appWindow.hide();
    });
  };

  async function getCommands() {
    const commands = await getAllCommands();
    setCommands(commands);
  }

  const onCommandSelect = (command: CommandType) => {
    track('Selected Command', {
      command,
    });
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
