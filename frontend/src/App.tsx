/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { appWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getAllCommands } from 'service/extension';

import { CommandView } from 'pages/command_view';
import { ErrorPage } from 'pages/error';
import { Extensions } from 'pages/extensions';
import { Search } from 'pages/search';
import SpecView from 'pages/spec_view/spec_view';

import { CommandsContext } from 'context/commands_context';

import { Command as CommandType } from 'types/common';

import styles from './App.module.scss';

const App = () => {
  const [commands, setCommands] = useState<CommandType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCommands();
    registerForBlur();
  }, []);

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
    navigate(`/command/${command.extension_id}/${command.key}`);
  };

  return (
    <div className={styles.app}>
      <CommandsContext.Provider
        value={{
          refetchCommands: getCommands,
          commands,
        }}
      >
        <Routes>
          <Route
            path="/search"
            element={<Search onCommandSelect={onCommandSelect} commands={commands} />}
          />
          <Route path="/spec/:extensionId/:commandId" element={<SpecView />} />
          <Route path="/command/:extensionId/:commandId" element={<CommandView />} />
          <Route path="/extensions" element={<Extensions />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </CommandsContext.Provider>
    </div>
  );
};

export default App;
