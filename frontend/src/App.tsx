import { appDir } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';
import { useEffect, useState } from 'react';

import styles from './App.module.scss';
import Search from './components/search/search';
import { CommandContext } from './context/command_context';
import { CommandsContext } from './context/commands_context';
import { Command as CommandType, getAllCommands } from './utils/commands';
import CommandView from './views/command_view/command_view';

const App = () => {
  const [commands, setCommands] = useState<CommandType[]>([]);
  const [currentCommand, setCurrentCommand] = useState<CommandType>();

  useEffect(() => {
    getCommands();
    // runbulbul();
  }, []);

  const resetCommand = () => {
    setCurrentCommand(undefined);
  };

  async function getCommands() {
    const commands = await getAllCommands();
    setCommands(commands);
  }

  const onCommandSelect = (command: CommandType) => {
    setCurrentCommand(command);
  };

  async function runbulbul() {
    // const response = await invoke('download_extension', { extensionId: 'asdf' });
    const appDirPath = await appDir();
    const commandResponse = new Command('run-sh', [`${appDirPath}/getApps.sh`]);
    commandResponse.spawn();
    commandResponse.on('error', (error) => console.error(`command error: "${error}"`));
    commandResponse.stdout.on('data', (line) => console.log(`command stdout: "${line}"`));
    commandResponse.stderr.on('data', (line) => console.log(`command stderr: "${line}"`));

    console.log(commandResponse);
  }

  // async function runbulbuljs() {
  //   const module = await import(
  //     '/Users/harshithmullapudi/Library/Application Support/com.poozlehq.dev/sample_extension/index.jsx'
  //   );
  //   console.log(module.default);
  //   setCurrentComponent(module.default);
  // }

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
