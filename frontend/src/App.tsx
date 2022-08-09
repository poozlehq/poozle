import { useEffect, useState } from 'react';

import { CommandsContext } from './context/commands_context';
import { CommandContext } from './context/command_context';

import { registerAppWindow } from './utils/application';
import { Command, getAllCommands } from './utils/commands';

import CommandView from './views/command_view/command_view';
import Search from './components/search';

import styles from './App.module.scss';

function App() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentCommand, setCurrentCommand] = useState<Command>();

  useEffect(() => {
    if (document) {
      registerAppWindow(resetCommand);
    }

    getCommands();
  }, []);

  const resetCommand = () => {
    setCurrentCommand(undefined);
  };

  async function getCommands() {
    const commands = await getAllCommands();
    setCommands(commands);
  }

  const onCommandSelect = (command: Command) => {
    setCurrentCommand(command);
  };

  return (
    <div className={styles.App}>
      <CommandsContext.Provider value={commands}>
        {currentCommand ? (
          <CommandContext.Provider value={currentCommand}>
            <CommandView command={currentCommand} resetCommand={resetCommand} />
          </CommandContext.Provider>
        ) : (
          <Search onCommandSelect={onCommandSelect} />
        )}
      </CommandsContext.Provider>
    </div>
  );
}

export default App;
